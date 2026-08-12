import Link from "next/link";
import Button from "@/components/Button";
import { formatDateLabel, formatSlotRange } from "@/lib/one-to-one";
import { OneToOneSuccessResponse } from "@/lib/types";

export default function BookingSuccess({
  result,
}: {
  result: OneToOneSuccessResponse;
}) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm sm:p-10">
      <div className="text-4xl">🌿</div>
      <h1 className="font-display mt-4 text-2xl text-ink">
        Your session is booked, {result.fullName}!
      </h1>

      <div className="mt-6 rounded-2xl bg-cream px-6 py-5">
        <p className="text-xs font-medium tracking-wide text-ink/50">
          YOUR APPOINTMENT
        </p>
        <p className="font-display mt-1 text-xl text-green">
          {formatDateLabel(result.date)}
        </p>
        <p className="font-display mt-1 text-lg text-green">
          {formatSlotRange(result.hour)}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link href="/">
          <Button className="w-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
