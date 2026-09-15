import type { Metadata } from "next";
import { Invitation } from "@/components/Invitation";
import { getGuest } from "@/lib/guests";

/**
 * A guest's personal link, /<slug>, as generated in the RSVP sheet. An unknown
 * slug still opens the invitation — unaddressed — rather than a 404, so a
 * mistyped link or a guest removed from the sheet never lands on an error.
 *
 * The guest is NOT awaited here. Apps Script takes anywhere from three seconds
 * to a minute to answer, and awaiting it held back the whole page — a blank
 * screen for as long as the sheet took. The promise goes down instead: the
 * invitation streams at once, and the guest's name and earlier reply stream
 * in behind it (see `use()` in <Hero /> and <Rsvp />).
 */
export default async function GuestPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  return <Invitation guest={getGuest(slug)} />;
}

/** The link preview in Zalo or Messenger names the guest it was sent to.
 *  Browsers get this streamed after the page; only link-preview bots wait. */
export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guest = await getGuest(slug);
  if (!guest) return {};
  return { title: `Linh & Tony — ${guest.name}` };
}
