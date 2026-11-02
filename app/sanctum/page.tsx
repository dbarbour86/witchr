import { redirect } from "next/navigation";

/**
 * The Sanctum root gateway:
 * Replaces the pre-launch "Coming Soon" gate with direct access to the Sanctum Chamber.
 */
export default function SanctumRootPage() {
  redirect("/sanctum/chamber");
}
