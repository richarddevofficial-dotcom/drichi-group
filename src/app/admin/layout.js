"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    setIsAuthenticated(auth === "true");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, pathname, router]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return children;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-blue transform transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                Drichi<span className="text-brand-orange">Group</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/admin"
                  ? "text-white bg-brand-orange"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link
              href="/admin/portfolio"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/admin/portfolio"
                  ? "text-white bg-brand-orange"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FolderOpen size={18} />
              Portfolio
            </Link>
            <Link
              href="/admin/messages"
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                pathname === "/admin/messages"
                  ? "text-white bg-brand-orange"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MessageSquare size={18} />
              Messages
            </Link>
          </nav>

          <div className="p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64">
        <div className="bg-white border-b border-brand-gray-100 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-brand-gray-500"
          >
            <Menu size={24} />
          </button>
          <button
            onClick={handleLogout}
            className="ml-auto text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Sign Out
          </button>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
