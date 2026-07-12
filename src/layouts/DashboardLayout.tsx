import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { TopBar } from "@/components/shared/TopBar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
