const STEPS = ["General Details", "Medical Details", "Payment"];

export default function ProgressSteps({ current }: { current: number }) {
  return (
    <ol className="mx-auto flex max-w-md items-center justify-between">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const isDone = step < current;
        const isActive = step === current;
        return (
          <li key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isDone || isActive
                    ? "bg-green text-cream-light"
                    : "bg-white text-ink/40 border border-ink/15"
                }`}
              >
                {isDone ? "✓" : step}
              </div>
              <span
                className={`hidden text-xs sm:block ${
                  isActive ? "font-medium text-green" : "text-ink/50"
                }`}
              >
                {label}
              </span>
            </div>
            {step < STEPS.length && (
              <div
                className={`mx-2 h-px flex-1 ${
                  isDone ? "bg-green" : "bg-ink/15"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
