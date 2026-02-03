import { SITE_CONFIG } from '@/src/config/site.config';
import { UI_CONFIG } from '@/src/config/ui.config';
import { ResetPasswordView } from "@/src/presentation/components/auth/ResetPasswordView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.resetPassword.title,
  description: SITE_CONFIG.metadata.resetPassword.description,
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
          <p className="text-muted">{UI_CONFIG.labels.loading}</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
