import AdminLayout from "@/components/admin/AdminLayout";
import { EmailMarketingNav } from "@/components/admin/email-marketing/EmailMarketingNav";
import { EmailMarketingHelpPanel } from "@/components/admin/email-marketing/EmailMarketingHelpPanel";
import { ReactNode } from "react";

export function EmailMarketingLayout({
  children,
  title,
  helpKey,
  fullWidth = false,
}: {
  children: ReactNode;
  title: string;
  helpKey?: string;
  fullWidth?: boolean;
}) {
  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-4">BoostMySites Email Marketing</p>
        <EmailMarketingNav />
        {fullWidth ? (
          <main>{children}</main>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <main className="order-2 lg:order-1">{children}</main>
            <div className="order-1 lg:order-2">
              <EmailMarketingHelpPanel helpKey={helpKey} />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
