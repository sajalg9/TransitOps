import { SearchInput } from "./SearchInput";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS } from "@/lib/constants";
import { useState } from "react";
import { LogOut } from "lucide-react";

export function TopBar() {
  const { profile, signOut } = useAuth();
  const [search, setSearch] = useState("");

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 gap-4 sticky top-0 bg-background/80 backdrop-blur z-10">
      <SearchInput value={search} onChange={setSearch} placeholder="Search..." />
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <span className="text-sm font-medium hidden sm:inline">
          {profile?.full_name ?? "User"}
        </span>
        {profile?.role && (
          <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary font-medium">
            {ROLE_LABELS[profile.role]}
          </span>
        )}
        <button
          onClick={signOut}
          className="p-2 rounded-md hover:bg-secondary transition-colors"
          aria-label="Sign out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}