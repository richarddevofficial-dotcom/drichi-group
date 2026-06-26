import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import Logo from "@/components/layout/Logo";

const services = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "Mobile Apps", href: "/services/mobile-app-development" },
  { label: "Pharmacy Systems", href: "/services/pharmacy-management-system" },
  { label: "School Management", href: "/services/school-management-system" },
  { label: "E-Commerce", href: "/services/e-commerce-solutions" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-blue">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:py-16 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-brand-gray-400 max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-brand-gray-400 transition-colors hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-xs sm:text-sm text-brand-gray-400 transition-colors hover:text-brand-orange"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 text-xs sm:text-sm text-brand-gray-400 transition-colors hover:text-brand-orange"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-xs sm:text-sm text-brand-gray-400 transition-colors hover:text-brand-orange"
                >
                  <Phone size={14} className="flex-shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs sm:text-sm text-brand-gray-400">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 lg:mt-12 border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-brand-gray-500">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
              reserved.
            </p>

            {/* Admin Portal Link - Clearly Visible */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-orange/30 bg-brand-orange/10 px-4 py-2 text-xs font-medium text-brand-orange hover:bg-brand-orange hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
