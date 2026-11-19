import { redirect } from "next/navigation";

// The wiki has no landing page yet (the animated hero comes later), so the
// wiki root opens the Basics section.
export default function EthereumIndex() {
  redirect("/ethereum/basics");
}
