import { SITE_CONFIG } from '@/src/config/site.config';
import { AdminDashboardView } from "@/src/presentation/components/admin/AdminDashboardView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.admin.title,
  description: SITE_CONFIG.metadata.admin.description,
};

export default function AdminPage() {
  return <AdminDashboardView />;
}
