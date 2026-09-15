import { unstable_cache } from "next/cache";
import { cache } from "react";

/** How long a guest's saved details count as fresh — a name corrected in the
 *  sheet shows within about this long. */
const GUEST_FRESH_S = 300;

/** The cache tag for one guest, so their reply can refresh it. */
export function guestTag(slug: string) {
  return `guest:${slug}`;
}

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
  // it. The request itself is never cached — getGuest keeps the ANSWER, with
  // its own freshness rules.
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

  // Kept in Next's data cache rather than asked of the sheet on every view:
  // Apps Script can take half a minute to answer, or not answer at all, and a
  // personal link that greets its guest as "Our dear guest" is the one thing
  // the link exists to prevent. Past GUEST_FRESH_S the saved copy is still
  // served at once while a fresh one is fetched behind it — and if that fetch
  // fails, the saved copy stays. A failure is thrown, never cached.
  const load = unstable_cache(
    async () => {
      const { guest } = await callSheet<{ guest: Guest | null }>({ action: "guest", slug });
      return guest;
    },
    ["guest", slug],
    { revalidate: GUEST_FRESH_S, tags: [guestTag(slug)] },
  );

  // Twice, for a guest with nothing saved yet.
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      return await load();
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
