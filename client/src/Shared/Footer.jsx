import { Link } from "react-router";
import { MapPin, Mail, Globe2, ExternalLink } from "lucide-react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import schoolBuilding from "../assets/school-building.webp";

const Footer = () => {
  const quickLinks = [
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      name: "Site Map",
      path: "/site-map",
    },
    {
      name: "Accessibility",
      path: "/accessibility",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com",
      icon: FaFacebook,
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: FaYoutube,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: FaLinkedin,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#00594f] text-white body-font">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-20 top-10 size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 size-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.7fr] lg:gap-14">
          {/* School information */}
          <div>
            {/* Logo and school name */}
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
              aria-label="Cosmo School Home"
            >
              <img
                src="/logo.png"
                alt="Cosmo School logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Main Campus */}
            <div className="mt-7">
              <FooterHeading>MAIN CAMPUS, MIRPUR</FooterHeading>

              <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-white/90">
                <p>
                  Section 12, Block B, Road 1, House 1,
                  <br />
                  Pallabi, Mirpur, Dhaka-1216
                </p>

                <p>(Beside Mirpur-12 City Club Ground)</p>

                <a
                  href="tel:+8801842900045"
                  className="block font-semibold transition-colors duration-300 hover:text-secondary"
                >
                  Phone: 01842-900045, 01973-900045
                </a>
              </div>
            </div>

            {/* Banasree Campus */}
            <div className="mt-7">
              <FooterHeading>BANASREE CAMPUS</FooterHeading>

              <div className="mt-3 space-y-1.5 text-sm leading-relaxed text-white/90">
                <p>
                  House 8, Block F, Banasree Main Road,
                  <br />
                  Rampura, Dhaka-1219
                </p>

                <a
                  href="tel:+8801972900045"
                  className="block font-semibold transition-colors duration-300 hover:text-secondary"
                >
                  Phone: 01972-900045
                </a>

                <a
                  href="tel:+8809639900044"
                  className="block font-semibold transition-colors duration-300 hover:text-secondary"
                >
                  IP Phone: 09639900044
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-7">
              <FooterHeading>CONTACT</FooterHeading>

              <div className="mt-3 space-y-2 text-sm text-white/90">
                <a
                  href="mailto:cosmoschool100@gmail.com"
                  className="group flex items-start gap-2 transition-colors duration-300 hover:text-secondary"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" />

                  <span>
                    <span className="font-bold text-white">Email:</span>{" "}
                    cosmoschool100@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.cosmoschools.org"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-2 transition-colors duration-300 hover:text-secondary"
                >
                  <Globe2 className="mt-0.5 size-4 shrink-0" />

                  <span>
                    <span className="font-bold text-white">Website:</span>{" "}
                    www.cosmoschools.org
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Links and social media */}
          <div>
            <FooterHeading>LINKS</FooterHeading>

            <nav className="mt-4 space-y-3" aria-label="Footer links">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="
                    group flex w-fit items-center gap-2
                    text-sm font-medium text-white/90
                    transition-all duration-300
                    hover:translate-x-1 hover:text-secondary
                  "
                >
                  <span>{link.name}</span>

                  <ExternalLink
                    className="
                      size-3.5 translate-x-1 opacity-0
                      transition-all duration-300
                      group-hover:translate-x-0 group-hover:opacity-100
                    "
                  />
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <FooterHeading>CONNECT</FooterHeading>

              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      className="
                        group grid size-11 place-items-center
                        rounded-full bg-accent text-white
                        shadow-[0_10px_25px_rgba(229,43,50,0.22)]
                        transition-all duration-300
                        hover:-translate-y-1 hover:scale-105
                        hover:bg-secondary hover:text-neutral
                        hover:shadow-[0_14px_30px_rgba(244,197,24,0.24)]
                        active:translate-y-0 active:scale-95
                      "
                    >
                      <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* School image */}
          <div className="md:col-span-2 lg:col-span-1">
            <div
              className="
                group relative h-full min-h-77.5
                overflow-hidden rounded-2xl
                border border-white/15
                bg-white/10
                shadow-[0_20px_50px_rgba(0,0,0,0.20)]
              "
            >
              <img
                src={schoolBuilding}
                alt="Cosmo School building"
                className="
                  absolute inset-0 h-full w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

              {/* Find us button */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="
                  group/button absolute bottom-4 right-4
                  flex min-h-11 items-center gap-2
                  rounded-xl bg-accent px-5
                  text-sm font-black text-white
                  shadow-[0_12px_28px_rgba(229,43,50,0.30)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:bg-secondary hover:text-neutral
                  hover:shadow-[0_16px_35px_rgba(244,197,24,0.28)]
                  active:translate-y-0 active:scale-95
                "
              >
                <MapPin className="size-4 transition-transform duration-300 group-hover/button:scale-110" />
                FIND US
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="relative border-t border-white/10 bg-black/10">
        <div
          className="
            mx-auto flex max-w-7xl flex-col gap-3
            px-4 py-5 text-center text-xs
            text-white/70
            sm:px-6 md:flex-row
            md:items-center md:justify-between
            md:text-left lg:px-8
          "
        >
          <p>© {new Date().getFullYear()} Cosmo School. All rights reserved.</p>

          <p>First in Class, First in Life.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterHeading = ({ children }) => {
  return (
    <h3
      className="
        relative inline-block
        text-sm font-black uppercase
        tracking-wide text-secondary
      "
    >
      {children}

      <span
        className="
          absolute -bottom-1 left-0 h-0.5 w-8
          rounded-full bg-accent
        "
      />
    </h3>
  );
};

export default Footer;
