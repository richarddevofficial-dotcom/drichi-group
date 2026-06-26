import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex flex-col items-start ${className}`}>
      {/* DG Monogram */}
      <div className="flex items-center justify-center rounded-lg bg-brand-orange px-3 py-1.5">
        <span className="text-xl sm:text-2xl font-extrabold text-white leading-none tracking-tight">
          DG
        </span>
      </div>
      {/* Company Name */}
      <span className="mt-1 text-[10px] sm:text-xs font-medium text-brand-gray-400 tracking-wider uppercase">
        Drichi Group
      </span>
    </Link>
  );
}
