import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    "bg-green text-cream-light hover:bg-green-dark disabled:bg-green-light",
  secondary:
    "bg-transparent text-green border border-green hover:bg-green/5",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
