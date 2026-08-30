import { Link, useLocation } from "react-router";
import { Zap, Menu, X, Moon, Sun, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { AuthDialog } from "./AuthDialog";
import { useAuth } from "../hooks/useAuth";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthDialogOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Zap className="size-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Smart Energy Tracker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    location.pathname === link.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="size-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Moon className="size-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.name}
                  </span>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleAuthClick("login")}
                    variant="ghost"
                    size="sm"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleAuthClick("signup")}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? (
                <X className="size-6" />
              ) : (
                <Menu className="size-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
                {user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                      {user.name}
                    </div>
                    <Button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        handleAuthClick("login");
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        handleAuthClick("signup");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}
