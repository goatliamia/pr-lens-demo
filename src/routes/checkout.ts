import { chargeSingleOrder } from "../billing/chargeSingleOrder.js";

export async function postCheckout(req: { userId: string; email: string; amountCents: number }) {
  // Blocks HTTP response until Stripe charge + receipt email both finish
  const result = await chargeSingleOrder(req);
  return { status: 200, body: result };
}
