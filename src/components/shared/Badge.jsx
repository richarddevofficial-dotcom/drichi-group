const variants = {
  orange: "bg-brand-orange/10 text-brand-orange",
  blue: "bg-brand-blue/10 text-brand-blue",
  green: "bg-green-100 text-green-700",
  gray: "bg-brand-gray-100 text-brand-gray-500",
};

export default function Badge({
  children,
  variant = "orange",
  className = "",
}) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
