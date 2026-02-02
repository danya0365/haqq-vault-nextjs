import { AdminDashboardView } from "@/src/presentation/components/admin/AdminDashboardView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "แผงควบคุมผู้ดูแล | Haqq Vault",
  description: "จัดการและดูแลระบบ Haqq Vault",
};

export default function AdminPage() {
  return <AdminDashboardView />;
}
