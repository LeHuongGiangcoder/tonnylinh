import { Invitation } from "@/components/Invitation";

/** The plain address: the invitation for anyone, unaddressed. */
export default function Page() {
  return <Invitation guest={null} />;
}
