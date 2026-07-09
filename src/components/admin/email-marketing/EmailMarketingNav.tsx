import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "Overview", href: "/admin/email-marketing" },
  { name: "Leads", href: "/admin/email-marketing/leads" },
  { name: "Campaigns", href: "/admin/email-marketing/campaigns" },
  { name: "Sequences", href: "/admin/email-marketing/sequences" },
  { name: "Import", href: "/admin/email-marketing/import" },
  { name: "Activity", href: "/admin/email-marketing/activity" },
  { name: "Settings", href: "/admin/email-marketing/settings" },
];

export function EmailMarketingNav() {
  const location = useLocation();
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-4">
      {tabs.map((tab) => {
        const active =
          tab.href === "/admin/email-marketing"
            ? location.pathname === tab.href
            : location.pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            to={tab.href}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm transition-colors",
              active ? "bg-cyan-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
