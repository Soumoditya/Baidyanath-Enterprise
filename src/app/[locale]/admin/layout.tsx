"use client";

import AdminGuard from "@/components/admin/admin-guard";
import AdminSidebar from "@/components/admin/admin-sidebar";
import Header from "@/components/layout/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 bg-slate-50 dark:bg-slate-900/50">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
