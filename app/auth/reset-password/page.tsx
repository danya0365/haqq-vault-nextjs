import { ResetPasswordView } from "@/src/presentation/components/auth/ResetPasswordView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "รีเซ็ตรหัสผ่าน | Haqq Vault",
  description: "ตั้งรหัสผ่านใหม่ Haqq Vault",
};

function ResetPasswordContent() {
  return <ResetPasswordView />;
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="animate-spin text-4xl inline-block mb-4">⏳</span>
          <p className="text-muted">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
