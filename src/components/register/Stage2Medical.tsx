import { Stage2Data } from "@/lib/types";
import { RadioGroup, TextAreaField } from "./FormFields";

interface Props {
  data: Stage2Data;
  errors: Record<string, string>;
  onChange: (patch: Partial<Stage2Data>) => void;
}

const YES_NO = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export default function Stage2Medical({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-ink">Medical Details</h2>
        <p className="mt-1 text-sm text-ink/60">
          This helps our team keep you safe and comfortable throughout the day.
        </p>
      </div>

      <RadioGroup
        label="Do you have any Medical Condition, Illness, or Disease?"
        name="hasMedicalCondition"
        value={data.hasMedicalCondition}
        options={YES_NO}
        onChange={(v) => onChange({ hasMedicalCondition: v as "Yes" | "No" })}
        error={errors.hasMedicalCondition}
      />

      {data.hasMedicalCondition === "Yes" && (
        <TextAreaField
          id="medicalConditionDetails"
          label="If Yes, please specify"
          value={data.medicalConditionDetails}
          onChange={(e) => onChange({ medicalConditionDetails: e.target.value })}
          error={errors.medicalConditionDetails}
          placeholder="e.g. physical limitation, heart/lung condition, skin issue, recent surgery"
        />
      )}

      {data.hasMedicalCondition === "Yes" && (
        <p className="-mt-2 rounded-xl bg-terracotta/10 px-4 py-3 text-xs leading-relaxed text-terracotta">
          Since this event includes an Ice Bath, our team will manually review
          your details before your Ice Bath option is confirmed.
        </p>
      )}

      <RadioGroup
        label="Are you on any medication?"
        name="onMedication"
        value={data.onMedication}
        options={YES_NO}
        onChange={(v) => onChange({ onMedication: v as "Yes" | "No" })}
        error={errors.onMedication}
      />

      {data.onMedication === "Yes" && (
        <TextAreaField
          id="medicationDetails"
          label="If Yes, please specify"
          value={data.medicationDetails}
          onChange={(e) => onChange({ medicationDetails: e.target.value })}
          error={errors.medicationDetails}
          placeholder="Please list your medication(s)"
        />
      )}

      <div className="rounded-xl border border-ink/15 bg-white p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.consentAgreed}
            onChange={(e) => onChange({ consentAgreed: e.target.checked })}
            className="mt-0.5 h-4 w-4 shrink-0 accent-green"
          />
          <span className="text-sm leading-relaxed text-ink/80">
            I hereby confirm that the information provided by me is accurate.
            In case the information is incorrect, the registration may be
            subject to cancellation even if screening is cleared. The
            registration fee once paid is non-refundable.{" "}
            <span className="font-medium text-ink">I Confirm and Agree</span>
          </span>
        </label>
        {errors.consentAgreed && (
          <p className="mt-2 text-xs text-terracotta">{errors.consentAgreed}</p>
        )}
      </div>
    </div>
  );
}
