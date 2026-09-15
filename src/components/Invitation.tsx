import { Agenda } from "@/components/Agenda";
import { Dresscode } from "@/components/Dresscode";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { HoneymoonFund } from "@/components/HoneymoonFund";
import { Intro } from "@/components/Intro";
import { PaperDefs } from "@/components/PaperDefs";
import { Rsvp } from "@/components/Rsvp";
import { ThankYou } from "@/components/ThankYou";
import { TimeVenue } from "@/components/TimeVenue";
import type { Guest } from "@/lib/guests";
import { LanguageProvider } from "@/lib/lang";

/**
 * The whole invitation — the same for everyone, except that a guest who came
 * in on their personal link is addressed by name in the hero and finds their
 * earlier reply already filled in.
 *
 * Sections butt straight against each other, and the change of ground is the
 * break. The one seam still dressed is below the dress code, where the red
 * silk swag (<Drape />) hangs off its foot across into the RSVP.
 */
export function Invitation({ guest }: { guest: Guest | null }) {
  return (
    <LanguageProvider>
      <PaperDefs />
      <Intro />
      <main className="site">
        <Hero guestName={guest?.name ?? null} />
        <Gallery />
        <TimeVenue />
        <Agenda />
        <Dresscode />
        <Rsvp guest={guest} />
        <HoneymoonFund />
        <ThankYou />
      </main>
    </LanguageProvider>
  );
}
