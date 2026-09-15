import { cache } from "react";

/**
 * The guest list lives in the RSVP Google Sheet, behind the Apps Script web app
 * in apps-script/Code.gs. Only the SERVER talks to it: the shared secret that
 * guards the web app is in RSVP_SHARED_SECRET, which has no NEXT_PUBLIC_ prefix
 * and so never reaches a browser.
 */

/** A guest as the sheet knows them, with the reply they last sent, if any. */
export type Guest = {
  slug: string;
  name: string;
  attending: boolean | null;
  contact: string;
  guests: string;
  diet: string;
  help: string;
  message: string;
};

/** What the RSVP form sends to /api/rsvp. */
export type RsvpReply = {
  slug?: string;
  name: string;
  contact: string;
  attending: boolean;
  guests: string;
  diet: string;
  help: string;
  message: string;
  lang: string;
};

/** The shape of a slug the sheet generates: lowercase ASCII words and hyphens. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSlug(value: string) {
  return value.length <= 120 && SLUG.test(value);
}

async function callSheet<T>(body: Record<string, unknown>): Promise<T> {
  const endpoint = process.env.RSVP_ENDPOINT;
  const secret = process.env.RSVP_SHARED_SECRET;
  if (!endpoint || !secret) {
    throw new Error("RSVP_ENDPOINT and RSVP_SHARED_SECRET must both be set.");
  }

  // Apps Script answers a POST with a redirect to the response; fetch follows
  // it. Never cached: a name the couple just corrected, or a reply just sent,
  // has to show on the next visit.
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...body, secret }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sheet answered ${res.status}`);

  const data = (await res.json()) as { ok: boolean; error?: string } & T;
  if (!data.ok) throw new Error(data.error ?? "Sheet refused the request");
  return data;
}

/**
 * The guest a personal link belongs to, or null if the link is unknown or the
 * sheet cannot be reached — the invitation still opens, just unaddressed.
 * Wrapped in `cache` so the page and its metadata share one request.
 */
export const getGuest = cache(async (slug: string): Promise<Guest | null> => {
  if (!isSlug(slug)) return null;
  // Twice: Apps Script fails now and then for reasons of its own, and a
  // personal link that greets its guest as "Our dear guest" is the one thing
  // the link exists to prevent.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { guest } = await callSheet<{ guest: Guest | null }>({ action: "guest", slug });
      return guest;
    } catch (error) {
      console.error(`Could not load guest (attempt ${attempt})`, slug, error);
    }
  }
  return null;
});

export async function saveReply(reply: RsvpReply) {
  await callSheet({ action: "rsvp", ...reply });
}

/**
 * Whether a reply is on the guest's row even though saving it reported a
 * failure. Apps Script can write the row and still fail to hand back its
 * answer, and a guest told "didn't go through" for a reply the couple have
 * already received is worse than no message at all. Only a personal link can
 * be checked: a guest on the plain address has no row to look up.
 */
export async function replyLanded(reply: RsvpReply) {
  if (!reply.slug) return false;
  try {
    const { guest } = await callSheet<{ guest: Guest | null }>({
      action: "guest",
      slug: reply.slug,
    });
    return (
      guest !== null &&
      guest.attending === reply.attending &&
      guest.contact === reply.contact &&
      guest.message === reply.message
    );
  } catch {
    return false;
  }
}
