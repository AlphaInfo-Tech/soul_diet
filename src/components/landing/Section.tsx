import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  decoration?: ReactNode;
}

export default function Section({ children, className = "", id, decoration }: SectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden px-6 py-16 sm:py-20 ${className}`}>
      {decoration}
      <div className="relative mx-auto max-w-3xl">{children}</div>
    </section>
  );
}
