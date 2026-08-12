"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ProgressSteps from "@/components/register/ProgressSteps";
import Stage1General from "@/components/register/Stage1General";
import AppointmentStep from "./AppointmentStep";
import BookingSuccess from "./BookingSuccess";
import { bookingBounds } from "@/lib/one-to-one";
import { OneToOneFormState, OneToOneSuccessResponse } from "@/lib/types";
import { validateAppointment, validateStage1 } from "@/lib/validation";

const STEPS = ["Your Details", "Appointment"];

const initialState: OneToOneFormState = {
  stage1: { fullName: "", age: "", city: "", email: "", contactNumber: "" },
  appointment: { date: "", hour: null },
};

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<OneToOneFormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<OneToOneSuccessResponse | null>(null);
  const [bookingId] = useState(() => crypto.randomUUID());
  const [bounds, setBounds] = useState<{ min: string; max: string } | null>(null);

  // "Today" differs between the server (UTC) and the visitor's browser (IST),
  // so resolving the date bounds during render would trip a hydration
  // mismatch. The API re-checks the window anyway — this is only the picker's
  // guard rail.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only resolution of today's date, not derivable from props/state
    setBounds(bookingBounds());
  }, []);

  function goNext() {
    const stageErrors = validateStage1(form.stage1);
    setErrors(stageErrors);
    if (Object.keys(stageErrors).length > 0) return;

    saveLead();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setSubmitError("");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Best-effort capture of step 1 so an abandoned booking still leaves a lead
  // in the Sheet. Never awaited, never allowed to block the step change.
  function saveLead() {
    fetch("/api/one-to-one/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        fullName: form.stage1.fullName.trim(),
        age: Number(form.stage1.age),
        city: form.stage1.city.trim(),
        email: form.stage1.email.trim(),
        contactNumber: form.stage1.contactNumber.trim(),
      }),
    }).catch(() => {
      // Non-critical: the full details go up again at final submission.
    });
  }

  async function handleSubmit() {
    const stageErrors = validateAppointment(form.appointment);
    setErrors(stageErrors);
    if (Object.keys(stageErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/one-to-one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          fullName: form.stage1.fullName.trim(),
          age: Number(form.stage1.age),
          city: form.stage1.city.trim(),
          email: form.stage1.email.trim(),
          contactNumber: form.stage1.contactNumber.trim(),
          date: form.appointment.date,
          hour: form.appointment.hour,
          website: "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        // A clash lands here. The user stays on this step with their details
        // intact and simply picks another slot.
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setResult(data as OneToOneSuccessResponse);
    } catch {
      setSubmitError(
        "We couldn't reach the server. Please check your connection and try again."
      );
      setSubmitting(false);
    }
  }

  if (result) return <BookingSuccess result={result} />;

  return (
    <div className="mx-auto max-w-lg pb-28">
      <ProgressSteps current={step} steps={STEPS} />

      <div className="mt-10 rounded-3xl bg-white/70 p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <Stage1General
            data={form.stage1}
            errors={errors}
            onChange={(patch) =>
              setForm((f) => ({ ...f, stage1: { ...f.stage1, ...patch } }))
            }
          />
        )}
        {step === 2 && (
          <AppointmentStep
            data={form.appointment}
            errors={errors}
            bounds={bounds}
            onChange={(patch) => {
              setSubmitError("");
              setForm((f) => ({ ...f, appointment: { ...f.appointment, ...patch } }));
            }}
          />
        )}

        {submitError && (
          <p className="mt-4 rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
            {submitError}
          </p>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-ink/10 bg-cream-light/95 px-6 py-4 backdrop-blur sm:static sm:mt-6 sm:border-0 sm:bg-transparent sm:p-0">
        <div className="mx-auto flex max-w-lg gap-3">
          {step > 1 && (
            <Button
              variant="secondary"
              className="flex-1"
              onClick={goBack}
              disabled={submitting}
            >
              Back
            </Button>
          )}
          {step === 1 && (
            <Button className="flex-1" onClick={goNext}>
              Next
            </Button>
          )}
          {step === 2 && (
            <Button className="flex-1" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Confirming your slot…" : "Confirm Booking"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
