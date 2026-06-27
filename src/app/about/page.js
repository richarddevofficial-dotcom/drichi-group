import { Target, Eye, Lightbulb, Handshake, Shield, Award } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

export const metadata = {
  title: "About Us - Drichi Group | Technology Partners",
  description:
    "Learn about Drichi Group - a technology startup specializing in software development, web development, mobile applications, and digital transformation solutions in Africa.",
  keywords:
    "about Drichi Group, software development company Uganda, tech startup Africa, digital solutions",
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We don't just follow trends; we set them by solving problems creatively.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description:
      "Your success is our metric. We embed ourselves in your vision.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We build secure, transparent systems you can always rely on.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "From code architecture to customer support, we never compromise on quality.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-blue pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
            About Us
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            We're Not Just Developers.
            <br />
            <span className="text-brand-orange">
              We're Your Technology Partners.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-brand-gray-400">
            Drichi Group was born from a passion for solving real-world problems
            through smart, accessible technology. We are a dynamic tech startup
            that engineers comprehensive digital ecosystems for modern
            enterprises.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-brand-gray-600">
                Our Story
              </h2>
              <p className="mt-4 leading-relaxed text-brand-gray-500">
                Drichi Group was born in Juba, South Sudan with a simple yet
                powerful vision: to bring world-class technology solutions to
                the world's youngest nation. We saw local pharmacies struggling
                with manual inventory tracking, schools drowning in paperwork,
                businesses unable to reach customers online, and organizations
                held back by outdated systems.
              </p>
              <p className="mt-4 leading-relaxed text-brand-gray-500">
                Today, we're proud to be part of South Sudan's digital
                transformation, delivering innovative software solutions that
                help local businesses and organizations operate more
                efficiently. From a pharmacy in Juba needing precise inventory
                control to a school managing hundreds of students, we translate
                complex operational challenges into simple, powerful software
                built for South Sudan's unique needs.
              </p>
            </div>
            <div className="space-y-8">
              {/* Mission */}
              <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/5 p-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-brand-orange" />
                  <h3 className="text-xl font-bold text-brand-gray-600">
                    Our Mission
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-brand-gray-500">
                  To empower South Sudanese businesses and organizations with
                  affordable, secure, and scalable digital solutions that
                  streamline operations, boost efficiency, and drive growth in
                  our local economy.
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-xl border border-brand-orange/20 bg-brand-orange/5 p-6">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-brand-orange" />
                  <h3 className="text-xl font-bold text-brand-gray-600">
                    Our Vision
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-brand-gray-500">
                  To be South Sudan's leading technology solutions provider,
                  powering the nation's digital future and setting the standard
                  for software excellence and innovation across East Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
              What Drives Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-brand-gray-600">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-brand-orange/10 p-4 text-brand-orange">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-gray-600">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-gray-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
