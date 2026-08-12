import { AppointmentData } from "@/lib/types";
import {
  SESSION_MINUTES,
  SLOT_START_HOURS,
  formatDateLabel,
  formatSlotRange,
} from "@/lib/one-to-one";
import { FieldWrapper, TextField } from "@/components/register/FormFields";

interface Props {
  data: AppointmentData;
  errors: Record<string, string>;
  onChange: (patch: Partial<AppointmentData>) => void;
  /** `null` until the mount effect resolves "today" — see BookingForm. */
  bounds: { min: string; max: string } | null;
}

export default function AppointmentStep({ data, errors, onChange, bounds }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-ink">Pick a time</h2>
        <p className="mt-1 text-sm text-ink/60">
          Sessions run for {SESSION_MINUTES} minutes, {formatSlotRange(SLOT_START_HOURS[0]).split(" – ")[0]}{" "}
          to 6:00 PM, India time.
        </p>
      </div>

      <TextField
        id="date"
        label="Appointment Date"
        type="date"
        value={data.date}
        min={bounds?.min}
        max={bounds?.max}
        // Clearing the date invalidates the slot too — a slot only means
        // something alongside the day it sits on.
        onChange={(e) => onChange({ date: e.target.value })}
        error={errors.date}
        hint={bounds ? "Available from tomorrow, up to 30 days ahead." : undefined}
      />

      <FieldWrapper label="Time Slot" error={errors.hour}>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {SLOT_START_HOURS.map((hour) => {
            const isSelected = data.hour === hour;
            return (
              <button
                key={hour}
                type="button"
                onClick={() => onChange({ hour })}
                aria-pressed={isSelected}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green/40 ${
                  isSelected
                    ? "border-green bg-green text-cream-light"
                    : "border-ink/15 bg-white text-ink/80 hover:border-green/50 hover:text-ink"
                }`}
              >
                {formatSlotRange(hour)}
              </button>
            );
          })}
        </div>
      </FieldWrapper>

      {data.date && data.hour !== null && !errors.date && !errors.hour && (
        <div className="rounded-2xl bg-green/10 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green/70">
            You are booking
          </p>
          <p className="mt-1 font-medium text-green">
            {formatDateLabel(data.date)} · {formatSlotRange(data.hour)}
          </p>
        </div>
      )}
    </div>
  );
}
