import { Agenda } from "@/components/Agenda";
import { Dresscode } from "@/components/Dresscode";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Rsvp } from "@/components/Rsvp";
import { ThankYou } from "@/components/ThankYou";
import { TimeVenue } from "@/components/TimeVenue";

/** Sections butt straight against each other — the change of ground is the break. */
export default function Page() {
  return (
    <>
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
    </>
  );
}
