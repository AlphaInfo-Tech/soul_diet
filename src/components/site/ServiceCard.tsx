import Link from "next/link";
import IconBadge from "@/components/IconBadge";
import { ArrowRightIcon } from "@/components/icons/WellnessIcons";
import { SERVICE_ICONS } from "@/components/site/service-icons";
import type { Service } from "@/lib/site-content";

interface ServiceCardProps {
  service: Service;
  /** `full` also renders the bullet list of details. */
  variant?: "compact" | "full";
}

export default function ServiceCard({ service, variant = "compact" }: ServiceCardProps) {
  const Icon = SERVICE_ICONS[service.icon];

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition-transform hover:-translate-y-0.5 sm:p-7">
      <IconBadge
        icon={<Icon />}
        tone={service.featured ? "terracotta" : "green"}
        size="md"
      />

      <h3 className="font-display mt-4 text-xl leading-snug text-ink">
        {service.title}
      </h3>

      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-terracotta">
        {service.format} · {service.duration}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-ink/75">{service.summary}</p>

      {variant === "full" && (
        <ul className="mt-5 space-y-2.5 border-t border-ink/10 pt-5">
          {service.details.map((detail) => (
            <li key={detail} className="flex gap-2.5 text-sm leading-relaxed text-ink/70">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green/40" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {service.href && (
        <Link
          href={service.href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green transition-colors hover:text-green-dark"
        >
          Learn more
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </article>
  );
}
