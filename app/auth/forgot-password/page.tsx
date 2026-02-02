import { ForgotPasswordView } from "@/src/presentation/components/auth/ForgotPasswordView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ลืมรหัสผ่าน | Haqq Vault",
  description: "รีเซ็ตรหัสผ่าน Haqq Vault",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
