interface UpiLinkParams {
  payeeVpa: string;
  payeeName: string;
  amount: number;
  transactionNote: string;
}

export function buildUpiLink({ payeeVpa, payeeName, amount, transactionNote }: UpiLinkParams): string {
  const params = new URLSearchParams({
    pa: payeeVpa,
    pn: payeeName,
    am: amount.toFixed(2),
    cu: "INR",
    tn: transactionNote,
  });
  return `upi://pay?${params.toString()}`;
}
