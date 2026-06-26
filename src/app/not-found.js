import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-orange">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>
        <p className="mt-4 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-all"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
