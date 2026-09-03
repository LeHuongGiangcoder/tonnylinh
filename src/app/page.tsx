import { Agenda } from "@/components/Agenda";
import { LaceSeam, RibbonSeam } from "@/components/Divider";
import { Dresscode } from "@/components/Dresscode";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Rsvp } from "@/components/Rsvp";
import { ThankYou } from "@/components/ThankYou";
import { TimeVenue } from "@/components/TimeVenue";

/**
 * Sections butt directly against each other; every seam is an overlay centred
 * on the line between them. Lace opens and closes the page (hero and thank
 * you); the silk ribbon carries every seam in between.
 */
export default function Page() {
  return (
    <>
      <Intro />

      <main className="site">
        <Hero />
        <LaceSeam />

        <Gallery />
        <RibbonSeam />

        <TimeVenue />
        <RibbonSeam flip />

        <Agenda />
        <RibbonSeam />

        <Dresscode />
        <RibbonSeam flip />

        <Rsvp />
        <LaceSeam />

        <ThankYou />
      </main>
    </>
  );
}
