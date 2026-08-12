import Link from "next/link";
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons/WellnessIcons";
import { CONTACT, NAV_LINKS, SERVICES, SITE } from "@/lib/site-content";
import { EVENT } from "@/lib/constants";

const SOCIALS = [
  { label: "WhatsApp", href: CONTACT.whatsapp, Icon: WhatsAppIcon },
  { label: "Instagram", href: CONTACT.instagram, Icon: InstagramIcon },
];

export default function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-green-dark text-cream-light/75"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-terracotta/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-xl text-cream-light">{SITE.name}</p>
            <p className="mt-2 text-sm leading-relaxed">{SITE.tagline}</p>
            <p className="mt-4 text-sm italic text-cream-light/60">
              {SITE.abundanceLine}
            </p>

            <ul className="mt-5 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-light/10 text-cream-light transition-colors hover:bg-cream-light/20"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Explore">
            {NAV_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {SERVICES.map((service) => (
              <FooterLink key={service.id} href={service.href ?? "/services"}>
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <li className="flex items-start gap-2.5">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-cream-light/50" />
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-cream-light">
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-cream-light/50" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="break-all transition-colors hover:text-cream-light"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-cream-light/50" />
              <span>{CONTACT.city}</span>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-cream-light/15 pt-6 text-sm sm:flex sm:items-center sm:justify-between">
          <p>
            © {EVENT.year} {SITE.name}. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0">
            Guided by <span className="text-cream-light">{SITE.founder}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cream-light">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="transition-colors hover:text-cream-light">
        {children}
      </Link>
    </li>
  );
}
