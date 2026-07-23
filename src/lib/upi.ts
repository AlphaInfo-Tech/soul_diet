export type UpiApp = "generic" | "gpay" | "phonepe" | "paytm";

const SCHEME_PREFIX: Record<UpiApp, string> = {
  generic: "upi://pay",
  gpay: "tez://upi/pay",
  phonepe: "phonepe://pay",
  paytm: "paytmmp://pay",
};

interface UpiLinkParams {
  payeeVpa: string;
  payeeName: string;
  amount: number;
  transactionNote: string;
  app?: UpiApp;
}

export function buildUpiLink({
  payeeVpa,
  payeeName,
  amount,
  transactionNote,
  app = "generic",
}: UpiLinkParams): string {
  const params = new URLSearchParams({
    pa: payeeVpa,
    pn: payeeName,
    am: amount.toFixed(2),
    cu: "INR",
    tn: transactionNote,
  });
  return `${SCHEME_PREFIX[app]}?${params.toString()}`;
}
