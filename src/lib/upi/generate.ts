const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID || "baidya.ent@okhdfcbank";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Baidyanath Enterprise";

export function generateUpiLink(amount: number, orderNumber: string): string {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: BUSINESS_NAME,
    am: amount.toFixed(2),
    cu: "INR",
    tn: `Order ${orderNumber}`,
  });
  return `upi://pay?${params.toString()}`;
}

export function getUpiId(): string {
  return UPI_ID;
}
