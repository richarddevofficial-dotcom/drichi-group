export default function IconBox({
  icon: Icon,
  variant = "orange",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const variantsStyle = {
    orange: "bg-brand-orange/10 text-brand-orange",
    blue: "bg-brand-blue/10 text-brand-blue",
    gray: "bg-brand-gray-100 text-brand-gray-500",
  };

  return (
    <div
      className={`inline-flex rounded-lg ${variantsStyle[variant]} ${sizes[size]} ${className}`}
    >
      <Icon size={iconSizes[size]} />
    </div>
  );
}
