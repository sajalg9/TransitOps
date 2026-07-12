import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Truck, Users, Route, Wrench, Fuel, BarChart3, Settings,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, any> = {
  LayoutDashboard, Truck, Users, Route, Wrench, Fuel, BarChart3, Settings,
};

export function AppSidebar() {
  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-border bg-card h-screen sticky top-0">
      <div className="p-5 flex items-center gap-2">
        <Truck className="text-primary" size={22} />
        <span className="font-bold text-lg">TransitOps</span>
      </div>
      <nav className="flex-1 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )
              }
            >
              <Icon size={17} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}