"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass, Target, Users, Landmark, HeartHandshake, Shield, Sparkles, BookOpen, Heart, Eye } from "lucide-react";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function About() {
  return (
    <AnimatedWrapper>
      {/* Page Header */}
      <section className="relative bg-slate-50 border-b border-slate-100 py-20 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
            Company Profile
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4">
            About Trimed Pharma
          </h1>
          <nav className="flex justify-center items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary-light">About Us</span>
          </nav>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7" data-animate="fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6 leading-tight">
                Fully Integrated Distributor of Healthcare Solutions
              </h2>
              <div className="space-y-6 text-slate-600 text-base leading-relaxed font-light">
                <p>
                  Trimed Pharma Pvt Ltd is a dedicated, fully integrated distributor of healthcare solutions, operating in Sri Lanka. The company consistently strives to make quality healthcare products accessible and affordable whilst upholding the best care in delivery throughout the country.
                </p>
                <p>
                  We represent Over-the-counter (OTC), generic and branded pharmaceuticals and biopharmaceuticals, supplying both the private and public healthcare markets diligently.
                </p>
                <p>
                  The company embraces a customer-centric culture in which every employee respects one another and understands the needs of each customer through a series of operating models that encourage customer-centricity, support, and engagement. The company democratizes customer insights, enabling marketing personnel to adopt a customer-oriented mindset and create a positive difference in the lives they touch.
                </p>
                <p>
                  Trimed Pharma takes pride in its accomplishments as a genuine and efficient partner who is able to deliver the full range of integrated distribution solutions for healthcare products. The company offers market access, a robust distribution network, warehousing, marketing and sales expertise, and sound registration and licensing capabilities.
                </p>
                <p>
                  We value superior quality pharmaceuticals that meet international standards and deliver their promises consistently. Trimed Pharma supports continuous improvement and value addition in all aspects of the business, generating value for its customers and shareholders. In the marketplace, Trimed Pharma promotes a strong will to win through its dedicated service, ingenuity, and restless desire to serve the best care possible.
                </p>
              </div>
            </div>

            {/* Right Side Parallax Graphic */}
            <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-video lg:aspect-square w-full" data-animate="scale-up">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100">
                <Image
                  src="/images/team_collaboration.png"
                  alt="Trimed Pharma distribution network team"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Vision */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between" data-animate="fade-up">
              <div>
                <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <Eye size={24} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed font-serif italic mb-6">
                  "To serve better quality and affordable healthcare solutions to every Sri Lankan citizen."
                </p>
              </div>
              <div className="h-[2px] w-12 bg-accent" />
            </div>

            {/* Mission */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm" data-animate="fade-up">
              <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Our Mission</h3>
              <ul className="space-y-4 text-slate-600 text-base leading-relaxed font-light">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <span>To provide patient-centered healthcare solutions with excellence in quality and service.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <span>To promote, protect and improve the lifelong health of individuals and societies.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <span>To provide products and services in a timely and competent manner, working with all stakeholder communities harmoniously and respectfully.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  <span>To be a responsible corporate citizen and share our achievement with our employees, customers, suppliers and the community at large whilst caring for issues that are adversely affecting global communities and the environment.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5" data-animate="fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
                Our Personnel
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6">
                Our Team & Human Strength
              </h2>
              <p className="text-slate-600 leading-relaxed text-base mb-6 font-light">
                We believe that our staff is the greatest strength of the company. Employees share the core values and contribute to the organizational culture positively with respect for one another.
              </p>
              <p className="text-slate-600 leading-relaxed text-base mb-8 font-light">
                Teamwork empowers individual strengths and the spirit of togetherness to deliver the best health solutions.
              </p>
              <div className="h-[2px] w-20 bg-primary" />
            </div>

            {/* Right Pillars list */}
            <div className="lg:col-span-7" data-animate="fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Support Success", desc: "We share in our dedication and commitment to each other and in striving to attain the goals of the company.", icon: <HeartHandshake size={20} /> },
                  { title: "Growth through Knowledge", desc: "Nurturing professional skills and technical capabilities systematically.", icon: <BookOpen size={20} /> },
                  { title: "Integrity First", desc: "Enforcing compliance, respect, and ethical business dealings.", icon: <Shield size={20} /> },
                  { title: "Effective Teamwork", desc: "Empowering individual strengths and a true spirit of corporate togetherness.", icon: <Users size={20} /> },
                  { title: "Understanding", desc: "Understanding the unique needs of our partners, public sectors, and clients.", icon: <Sparkles size={20} /> }
                ].map((pillar, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 group hover:border-primary/20 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-accent">
                      {pillar.icon}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-primary mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Supplier Community */}
      <section id="suppliers" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 order-last lg:order-first relative aspect-4/3 sm:aspect-video lg:aspect-square w-full" data-animate="scale-up">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100">
                <Image
                  src="/images/hero_biopharma.png"
                  alt="High-end global pharmaceutical partners"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7" data-animate="fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
                Global Partnerships
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6">
                Our Supplier Community
              </h2>
              <div className="space-y-6 text-slate-600 text-base leading-relaxed font-light">
                <p>
                  At Trimed Pharma, we promote positive relationships and effective interactions with our suppliers from across the globe. As a primary obligation, we maintain professional conduct and responsibility in all our business dealings with our partners.
                </p>
                <p>
                  We commit to nurturing relations with those who share our same compassion for treating and curing illness through effective healthcare solutions.
                </p>
                <p>
                  Through sound registration capability, warehousing facility, marketing skill, and distribution reach, we serve as an efficient gateway to the Sri Lankan public and private markets for pharmaceutical manufacturers worldwide.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Focus */}
      <section id="social" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7" data-animate="fade-up">
              <span className="text-accent text-sm font-bold uppercase tracking-widest block mb-2">
                Corporate Citizenship
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6">
                Social Focus & Philanthropy
              </h2>
              <div className="space-y-6 text-slate-600 text-base leading-relaxed font-light">
                <p>
                  Trimed Pharma consistently supports philanthropic initiatives that help extend and enhance the quality of life, protection of the environment, eradication of poverty and clean drinking water for all.
                </p>
                <p>
                  Donations of healthcare products are made to those in need, clinics based on charity service and for the up lifting of rural hospitals throughout the country.
                </p>
                <p>
                  Our staff members are involved in these philanthropic initiatives through the contribution of funds, resources and effort to make each programme a success. We believe that caring for local communities and issues that adversely affect global societies is core to our corporate responsibility.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative aspect-4/3 sm:aspect-video lg:aspect-square w-full" data-animate="scale-up">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-100">
                <Image
                  src="/images/social_impact_clinic.png"
                  alt="Trimed Pharma CSR outreach Sri Lanka"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </AnimatedWrapper>
  );
}
