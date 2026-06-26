import Link from "next/link";

const variants = {
  primary: "bg-brand-orange text-white hover:bg-brand-orange-600",
  secondary: "bg-brand-blue text-white hover:bg-brand-blue-50",
  outline:
    "border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white",
  white: "bg-white text-brand-orange hover:bg-brand-gray-50",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
