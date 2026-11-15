import { sendReceiptSync } from "./sendReceiptSync.js";

export interface LegacyCheckoutInput {
  userId: string;
  email: string;
  amountCents: number;
}

export async function chargeSingleOrder(input: LegacyCheckoutInput) {
  const res = await fetch("https://api.stripe.com/v1/charges", {
    method: "POST",
    body: new URLSearchParams({
      customer: input.userId,
      amount: String(input.amountCents),
      currency: "usd",
    }),
  });
  const charge = (await res.json()) as { id: string };
  await sendReceiptSync(input.email, charge.id);
  return { invoiceId: charge.id, status: "paid" as const };
}
