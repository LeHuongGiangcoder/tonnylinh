import { Agenda } from "@/components/Agenda";
import { Dresscode } from "@/components/Dresscode";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Rsvp } from "@/components/Rsvp";
import { ThankYou } from "@/components/ThankYou";
import { TimeVenue } from "@/components/TimeVenue";

/**
 * Sections butt straight against each other — the change of ground is the break.
 *
 * The envelope entrance is parked, not deleted: <Intro /> still lives in
 * src/components/Intro.tsx with its styles in globals.css. To put it back,
 * restore the import and render it above <main>. Nothing else depends on it —
 * it was the only thing setting document.body.dataset.locked, so the page
 * scrolls freely while it is out.
 */
export default function Page() {
  return (
    <main className="site">
      <Hero />
      <Gallery />
      <TimeVenue />
      <Agenda />
      <Dresscode />
      <Rsvp />
      <ThankYou />
    </main>
  );
}
