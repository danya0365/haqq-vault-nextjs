import { TermsView } from "@/src/presentation/components/legal/TermsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เงื่อนไขการใช้งาน | Haqq Vault",
  description: "เงื่อนไขการใช้งานเว็บไซต์ Haqq Vault",
};

export default function TermsPage() {
  return <TermsView />;
}
