import { ContactView } from "@/src/presentation/components/about/ContactView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Haqq Vault",
  description:
    "ติดต่อทีม Haqq Vault - ส่งคำถาม ข้อเสนอแนะ หรือแจ้งข้อผิดพลาด",
};

export default function ContactPage() {
  return <ContactView />;
}
