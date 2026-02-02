import { PrivacyView } from "@/src/presentation/components/legal/PrivacyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | Haqq Vault",
  description: "นโยบายความเป็นส่วนตัวของ Haqq Vault",
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
