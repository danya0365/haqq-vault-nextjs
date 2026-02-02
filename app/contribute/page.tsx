import { ContributeView } from "@/src/presentation/components/contribute/ContributeView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เพิ่มคำตอบ | Haqq Vault",
  description: "เพิ่มคำตอบใหม่สำหรับ Haqq Vault",
};

export default function ContributePage() {
  return <ContributeView />;
}
