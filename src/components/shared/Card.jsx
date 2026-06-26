export default function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ${
        hover ? "hover-lift" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
