import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

interface FieldWrapperProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FieldWrapper({ label, htmlFor, error, hint, children }: FieldWrapperProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink/50">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-terracotta">{error}</p>}
    </div>
  );
}

const inputBaseClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-green/40";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({ label, error, hint, id, className = "", ...props }: TextFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <input
        id={id}
        className={`${inputBaseClass} ${error ? "border-terracotta" : "border-ink/15"} ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextAreaField({ label, error, hint, id, className = "", ...props }: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} htmlFor={id} error={error} hint={hint}>
      <textarea
        id={id}
        rows={3}
        className={`${inputBaseClass} resize-none ${error ? "border-terracotta" : "border-ink/15"} ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: string;
}

export function RadioGroup({ label, name, value, options, onChange, error }: RadioGroupProps) {
  return (
    <FieldWrapper label={label} error={error}>
      <div className="flex gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex-1 cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition-colors ${
              value === opt.value
                ? "border-green bg-green/10 text-green"
                : "border-ink/15 bg-white text-ink/70 hover:border-ink/30"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}
