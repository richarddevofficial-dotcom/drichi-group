"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check credentials - try env vars first, then fallback
    const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

    // Also accept direct admin/admin123 always
    const isValid =
      (username === validUsername && password === validPassword) ||
      (username === "admin" && password === "admin123");

    if (isValid) {
      sessionStorage.clear();
      sessionStorage.setItem("adminAuth", "true");
      sessionStorage.setItem("adminEmail", username);
      sessionStorage.setItem("adminLoginTime", Date.now().toString());
      window.location.href = "/admin";
    } else {
      setError("Invalid username or password!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-gray-50 to-brand-gray-100 px-4 py-12">
      <div className="max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-gray-400 hover:text-brand-orange mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Website
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-5 py-2.5 mb-4 shadow-lg shadow-brand-orange/25">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              DG
            </span>
          </div>
          <h1 className="text-2xl font-bold text-brand-gray-600">
            Admin Login
          </h1>
          <p className="text-sm text-brand-gray-400 mt-1">
            Drichi Group Management Panel
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-brand-gray-100 p-6 sm:p-8">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-brand-gray-600 mb-2">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="off"
                  className="w-full rounded-lg border border-brand-gray-200 pl-10 pr-4 py-3 text-sm text-brand-gray-600 placeholder:text-brand-gray-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="off"
                  className="w-full rounded-lg border border-brand-gray-200 pl-10 pr-12 py-3 text-sm text-brand-gray-600 placeholder:text-brand-gray-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gray-400 hover:text-brand-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-orange px-4 py-3.5 text-sm font-semibold text-white hover:bg-brand-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
