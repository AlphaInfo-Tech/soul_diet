"use client";

import { useState } from "react";
import Button from "@/components/Button";
import ProgressSteps from "./ProgressSteps";
import Stage1General from "./Stage1General";
import Stage2Medical from "./Stage2Medical";
import Stage3Payment from "./Stage3Payment";
import SuccessScreen from "./SuccessScreen";
import { RegistrationFormState, RegisterSuccessResponse } from "@/lib/types";
import { validateStage1, validateStage2, validateStage3 } from "@/lib/validation";
import { TICKETS } from "@/lib/constants";

const initialState: RegistrationFormState = {
  stage1: { fullName: "", age: "", city: "", email: "", contactNumber: "" },
  stage2: {
    hasMedicalCondition: "",
    medicalConditionDetails: "",
    onMedication: "",
    medicationDetails: "",
    consentAgreed: false,
  },
  stage3: {
    ticketId: "",
    utr: "",
    screenshotFile: null,
    screenshotBase64: "",
    screenshotName: "",
  },
};

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RegistrationFormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<RegisterSuccessResponse | null>(null);

  function goNext() {
    let stageErrors: Record<string, string> = {};
    if (step === 1) stageErrors = validateStage1(form.stage1);
    if (step === 2) stageErrors = validateStage2(form.stage2);

    setErrors(stageErrors);
    if (Object.keys(stageErrors).length === 0) {
      setStep((s) => Math.min(3, s + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    const stageErrors = validateStage3(form.stage3);
    setErrors(stageErrors);
    if (Object.keys(stageErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    const ticket = TICKETS[form.stage3.ticketId as keyof typeof TICKETS];

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.stage1.fullName.trim(),
          age: Number(form.stage1.age),
          city: form.stage1.city.trim(),
          email: form.stage1.email.trim(),
          contactNumber: form.stage1.contactNumber.trim(),
          hasMedicalCondition: form.stage2.hasMedicalCondition,
          medicalConditionDetails:
            form.stage2.hasMedicalCondition === "Yes"
              ? form.stage2.medicalConditionDetails.trim()
              : null,
          onMedication: form.stage2.onMedication,
          medicationDetails:
            form.stage2.onMedication === "Yes"
              ? form.stage2.medicationDetails.trim()
              : null,
          consentAgreed: form.stage2.consentAgreed,
          ticketType: ticket.ticketType,
          amount: ticket.amount,
          utr: form.stage3.utr.trim() || null,
          screenshotBase64: form.stage3.screenshotBase64,
          screenshotName: form.stage3.screenshotName,
          website: "",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setResult(data as RegisterSuccessResponse);
    } catch {
      setSubmitError("We couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (result) return <SuccessScreen result={result} />;

  return (
    <div className="mx-auto max-w-lg pb-28">
      <ProgressSteps current={step} />

      <div className="mt-10 rounded-3xl bg-white/70 p-6 shadow-sm sm:p-8">
        {step === 1 && (
          <Stage1General
            data={form.stage1}
            errors={errors}
            onChange={(patch) => setForm((f) => ({ ...f, stage1: { ...f.stage1, ...patch } }))}
          />
        )}
        {step === 2 && (
          <Stage2Medical
            data={form.stage2}
            errors={errors}
            onChange={(patch) => setForm((f) => ({ ...f, stage2: { ...f.stage2, ...patch } }))}
          />
        )}
        {step === 3 && (
          <Stage3Payment
            data={form.stage3}
            errors={errors}
            onChange={(patch) => setForm((f) => ({ ...f, stage3: { ...f.stage3, ...patch } }))}
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
            <Button variant="secondary" className="flex-1" onClick={goBack} disabled={submitting}>
              Back
            </Button>
          )}
          {step < 3 && (
            <Button className="flex-1" onClick={goNext}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button className="flex-1" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Processing your registration…" : "Submit Registration"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
