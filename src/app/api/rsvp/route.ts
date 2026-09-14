import { isSlug, replyLanded, saveReply, type RsvpReply } from "@/lib/guests";

const text = (value: unknown, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/**
 * Takes a reply from the RSVP form and hands it to the sheet with the shared
 * secret attached. The form cannot call Apps Script itself without giving the
 * secret away.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const slug = text(body.slug, 120);
  const reply: RsvpReply = {
    slug: slug && isSlug(slug) ? slug : undefined,
    name: text(body.name, 200),
    contact: text(body.contact, 200),
    attending: body.attending === true,
    guests: text(body.guests, 4),
    diet: text(body.diet),
    help: text(body.help, 100),
    message: text(body.message),
    lang: text(body.lang, 8),
  };

  // A guest without a personal link is only known by the name they type.
  if (!reply.slug && !reply.name) {
    return Response.json({ ok: false, error: "name required" }, { status: 400 });
  }

  try {
    await saveReply(reply);
    return Response.json({ ok: true });
  } catch (error) {
    // The sheet may have written the row and only failed to answer: look
    // before telling the guest it didn't go through.
    if (await replyLanded(reply)) {
      console.warn("RSVP saved, but the sheet's answer failed", error);
      return Response.json({ ok: true });
    }
    console.error("RSVP not saved", error);
    return Response.json({ ok: false }, { status: 502 });
  }
}
