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
  try {
    const { guest } = await callSheet<{ guest: Guest | null }>({ action: "guest", slug });
    return guest;
  } catch (error) {
    console.error("Could not load guest", slug, error);
    return null;
  }
});

export async function saveReply(reply: RsvpReply) {
  await callSheet({ action: "rsvp", ...reply });
}
