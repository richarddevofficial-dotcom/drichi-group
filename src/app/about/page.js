import { Target, Eye, Lightbulb, Handshake, Shield, Award } from "lucide-react";
import CTABanner from "@/components/home/CTABanner";

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
      <section className="bg-navy pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange">
            About Us
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-white md:text-5xl">
            We're Not Just Developers.
            <br />
            <span className="gradient-text">
              We're Your Technology Partners.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
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
              <h2 className="text-3xl font-bold text-navy">Our Story</h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Drichi Group began with a simple yet powerful vision: to make
                sophisticated technology accessible to businesses of every size
                across Africa. We saw pharmacies struggling with manual
                inventory, schools drowning in paperwork, and businesses unable
                to reach customers online.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Today, we're proud to have delivered 50+ projects that transform
                how our clients operate. From a pharmacy needing precise
                inventory control to a school managing thousands of students, we
                translate complex operational challenges into elegant,
                easy-to-use software.
              </p>
            </div>
            <div className="space-y-8">
              {/* Mission */}
              <div className="rounded-xl border border-blue/20 bg-blue/5 p-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-blue" />
                  <h3 className="text-xl font-bold text-navy">Our Mission</h3>
                </div>
                <p className="mt-3 leading-relaxed text-gray-600">
                  To democratize digital power by providing affordable, secure,
                  and scalable solutions that streamline operations, boost
                  efficiency, and unlock new growth for businesses of every
                  size.
                </p>
              </div>

              {/* Vision */}
              <div className="rounded-xl border border-orange/20 bg-orange/5 p-6">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-orange" />
                  <h3 className="text-xl font-bold text-navy">Our Vision</h3>
                </div>
                <p className="mt-3 leading-relaxed text-gray-600">
                  To be the leading technology solutions provider in Africa,
                  recognized for transforming how organizations operate and
                  setting a new standard for software excellence and
                  partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange">
              What Drives Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-navy">
              Our Core Values
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-blue/10 p-4 text-blue">
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
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
