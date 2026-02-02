import { LoginView } from "@/src/presentation/components/auth/LoginView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เข้าสู่ระบบ | Haqq Vault",
  description: "เข้าสู่ระบบ Haqq Vault",
};

export default function LoginPage() {
  return <LoginView />;
}
