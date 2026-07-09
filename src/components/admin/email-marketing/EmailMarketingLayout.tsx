import AdminLayout from "@/components/admin/AdminLayout";
import { EmailMarketingNav } from "@/components/admin/email-marketing/EmailMarketingNav";
import { ReactNode } from "react";

export function EmailMarketingLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-4">BoostMySites Email Marketing</p>
        <EmailMarketingNav />
        {children}
      </div>
    </AdminLayout>
  );
}
