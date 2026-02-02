import { ScholarsView } from "@/src/presentation/components/about/ScholarsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ทีมนักวิชาการ | Haqq Vault",
  description:
    "พบกับบรรดานักวิชาการผู้ทรงคุณวุฒิที่ตรวจสอบและรับรองความถูกต้องของคำตอบใน Haqq Vault",
};

export default function ScholarsPage() {
  return <ScholarsView />;
}
