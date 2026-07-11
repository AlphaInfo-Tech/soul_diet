import { Stage1Data } from "@/lib/types";
import { TextField } from "./FormFields";

interface Props {
  data: Stage1Data;
  errors: Record<string, string>;
  onChange: (patch: Partial<Stage1Data>) => void;
}

export default function Stage1General({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-ink">General Details</h2>
        <p className="mt-1 text-sm text-ink/60">
          Let&apos;s start with the basics — this helps us prepare for your visit.
        </p>
      </div>

      <TextField
        id="fullName"
        label="Full Name"
        value={data.fullName}
        onChange={(e) => onChange({ fullName: e.target.value })}
        error={errors.fullName}
        placeholder="Your full name"
        autoComplete="name"
      />

      <TextField
        id="age"
        label="Age"
        type="number"
        inputMode="numeric"
        min={16}
        max={90}
        value={data.age}
        onChange={(e) => onChange({ age: e.target.value })}
        error={errors.age}
        placeholder="e.g. 34"
      />

      <TextField
        id="city"
        label="City of Residence"
        value={data.city}
        onChange={(e) => onChange({ city: e.target.value })}
        error={errors.city}
        placeholder="e.g. Salem"
        autoComplete="address-level2"
      />

      <TextField
        id="email"
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        error={errors.email}
        placeholder="you@example.com"
        autoComplete="email"
        hint="We'll send your registration confirmation here."
      />

      <TextField
        id="contactNumber"
        label="Contact Number"
        type="tel"
        inputMode="numeric"
        value={data.contactNumber}
        onChange={(e) =>
          onChange({ contactNumber: e.target.value.replace(/[^\d]/g, "").slice(0, 10) })
        }
        error={errors.contactNumber}
        placeholder="10-digit mobile number"
        autoComplete="tel"
      />
    </div>
  );
}
