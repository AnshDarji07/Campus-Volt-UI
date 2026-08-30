import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { AuthProvider } from "../hooks/useAuth";

export function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navigation />
        <Outlet />
      </div>
    </AuthProvider>
  );
}