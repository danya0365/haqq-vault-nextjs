import { ChangePasswordView } from "@/src/presentation/components/auth/ChangePasswordView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เปลี่ยนรหัสผ่าน | Haqq Vault",
  description: "เปลี่ยนรหัสผ่าน Haqq Vault",
};

export default function ChangePasswordPage() {
  return <ChangePasswordView />;
}
