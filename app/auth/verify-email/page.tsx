import { VerifyEmailView } from "@/src/presentation/components/auth/VerifyEmailView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ยืนยันอีเมล | Haqq Vault",
  description: "ยืนยันอีเมล Haqq Vault",
};

function VerifyEmailContent() {
  return <VerifyEmailView />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="animate-spin text-4xl inline-block mb-4">⏳</span>
          <p className="text-muted">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
