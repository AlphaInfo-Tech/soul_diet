import type { Metadata } from "next";
import Section from "@/components/landing/Section";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import IconBadge from "@/components/IconBadge";
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons/WellnessIcons";
import { CONTACT, CONTACT_SUBJECTS, SITE } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${SITE.founder} about the Soul Diet 21-day programme, the mental fitness series, guided meditation or an upcoming event.`,
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    Icon: PhoneIcon,
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
  },
  {
    Icon: MailIcon,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: CONTACT.whatsapp,
    external: true,
  },
  {
    Icon: MapPinIcon,
    label: "Based in",
    value: CONTACT.city,
    href: null,
  },
];

const COMMUNITIES = [
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: CONTACT.instagram,
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { subject } = await searchParams;

  // Only ever accept a subject the dropdown actually offers — anything else
  // would be written into the select and relayed on to the Sheet.
  const defaultSubject =
    typeof subject === "string" &&
    (CONTACT_SUBJECTS as readonly string[]).includes(subject)
      ? subject
      : "";

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk"
        lede="Tell me what you are carrying and which practice you are curious about. There is no wrong starting point."
      />

      <Section width="wide">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <ContactForm defaultSubject={defaultSubject} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl text-ink">Reach out directly</h2>

            <ul className="mt-6 space-y-5">
              {CHANNELS.map(({ Icon, label, value, href, external }) => (
                <li key={label} className="flex items-start gap-4">
                  <IconBadge icon={<Icon />} size="md" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-terracotta">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="mt-0.5 block break-words text-ink transition-colors hover:text-green"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-12 text-2xl text-ink">Find the community</h2>

            <ul className="mt-6 space-y-4">
              {COMMUNITIES.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-ink/5 transition-transform hover:-translate-y-0.5"
                  >
                    <IconBadge icon={<Icon />} tone="terracotta" size="md" />
                    <p className="font-medium text-ink">{label}</p>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-display text-lg text-green italic">
              {SITE.abundanceLine}
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
