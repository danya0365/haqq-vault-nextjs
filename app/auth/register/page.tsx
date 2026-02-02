import { RegisterView } from "@/src/presentation/components/auth/RegisterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "สมัครสมาชิก | Haqq Vault",
  description: "สมัครสมาชิก Haqq Vault",
};

export default function RegisterPage() {
  return <RegisterView />;
}
