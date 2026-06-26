"use client";

import { RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Something went wrong!
        </h1>
        <p className="mt-4 text-gray-400">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-orange px-6 py-3 font-semibold text-white hover:bg-orange-600 transition-all"
        >
          <RefreshCw size={20} />
          Try Again
        </button>
      </div>
    </div>
  );
}
