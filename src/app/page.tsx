import { Agenda } from "@/components/Agenda";
import { Dresscode } from "@/components/Dresscode";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { PaperDefs } from "@/components/PaperDefs";
import { Rsvp } from "@/components/Rsvp";
import { ThankYou } from "@/components/ThankYou";
import { TimeVenue } from "@/components/TimeVenue";
import { LanguageProvider } from "@/lib/lang";

/**
 * Sections butt straight against each other, and the change of ground is the
 * break. Where a red ground meets the cream one below it that seam is dressed:
 * with lace (<Lace />) everywhere, and with the red silk swag (<Drape />) at
 * the one seam below the dress code. Either goes in as the first child of the
 * cream section, which pays for it out of its own top padding.
 */
export default function Page() {
  return (
    <LanguageProvider>
      <PaperDefs />
      <Intro />
      <main className="site">
        <Hero />
        <Gallery />
        <TimeVenue />
        <Agenda />
        <Dresscode />
        <Rsvp />
        <ThankYou />
      </main>
    </LanguageProvider>
  );
}
