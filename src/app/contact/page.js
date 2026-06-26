"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  { icon: MapPin, label: "Address", value: SITE_CONFIG.address },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon - Fri: 8:00 AM - 6:00 PM",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const serviceOptions = [
    "Website Development",
    "Mobile App Development",
    "Pharmacy Management System",
    "School Management System",
    "Hospital Management System",
    "E-Commerce Solutions",
    "IT Consultancy",
    "Other",
  ];

  return (
    <>
      <section className="bg-navy pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange">
            Contact Us
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            Let's Build Something Great Together
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            Have a project in mind? We're ready to bring it to life. Reach out
            and let's start a conversation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="rounded-lg bg-blue/10 p-3 text-blue">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-medium text-navy hover:text-orange transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium text-navy">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="rounded-2xl bg-green-50 p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy">
                    Message Sent Successfully!
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-lg bg-blue px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl bg-gray-50 p-8"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                        placeholder="Your Company Ltd"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-navy">
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-navy">
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-navy focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
                      placeholder="Describe your project, requirements, and goals..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-orange px-6 py-4 font-semibold text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
