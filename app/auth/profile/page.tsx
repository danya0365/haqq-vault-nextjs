import { ProfileView } from "@/src/presentation/components/auth/ProfileView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โปรไฟล์ | Haqq Vault",
  description: "จัดการโปรไฟล์ของคุณ Haqq Vault",
};

export default function ProfilePage() {
  return <ProfileView />;
}
