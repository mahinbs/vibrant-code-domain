import { Search, RefreshCw } from "lucide-react";
import { type RefObject } from "react";
import { Input } from "@/components/ui/input";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";

export type InboxFilter = "needs_reply" | "unread" | "waiting" | "replied" | "all";

const FILTERS: { value: InboxFilter; label: string }[] = [
  { value: "needs_reply", label: "Needs reply" },
  { value: "unread", label: "Unread" },
  { value: "waiting", label: "Waiting" },
  { value: "replied", label: "Replied" },
  { value: "all", label: "All" },
];

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  filter: InboxFilter;
  onFilterChange: (filter: InboxFilter) => void;
  onRefresh: () => void;
  loading?: boolean;
  searchInputRef?: RefObject<HTMLInputElement | null>;
};

export function InboxSearchBar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  onRefresh,
  loading,
  searchInputRef,
}: Props) {
  return (
    <div className="space-y-3 shrink-0">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            ref={searchInputRef}
            placeholder="Search name, email, subject, body…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-gray-900 border-gray-700"
          />
        </div>
        <EmActionButton variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </EmActionButton>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              filter === f.value
                ? "border-cyan-500/60 bg-cyan-950/40 text-cyan-100"
                : "border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-gray-600">
        Shortcuts: <kbd className="text-gray-500">/</kbd> search · <kbd className="text-gray-500">j</kbd>
        /<kbd className="text-gray-500">k</kbd> move · <kbd className="text-gray-500">r</kbd> reply
      </p>
    </div>
  );
}
