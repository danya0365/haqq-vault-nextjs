import { SITE_CONFIG } from '@/src/config/site.config';
import { UI_CONFIG } from '@/src/config/ui.config';
import { VerifyEmailView } from "@/src/presentation/components/auth/VerifyEmailView";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.verifyEmail.title,
  description: SITE_CONFIG.metadata.verifyEmail.description,
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
          <p className="text-muted">{UI_CONFIG.labels.loading}</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
