import type { Metadata } from "next";
import { Invitation } from "@/components/Invitation";
import { getGuest } from "@/lib/guests";

/**
 * A guest's personal link, /<slug>, as generated in the RSVP sheet. An unknown
 * slug still opens the invitation — unaddressed — rather than a 404, so a
 * mistyped link or a guest removed from the sheet never lands on an error.
 */
export default async function GuestPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const guest = await getGuest(slug);
  return <Invitation guest={guest} />;
}

/** The link preview in Zalo or Messenger names the guest it was sent to. */
export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guest = await getGuest(slug);
  if (!guest) return {};
  return { title: `Linh & Tony — ${guest.name}` };
}
