export async function submitCheckout(planId: string, seats: number) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ planId, seats }),
  });
  return response.json();
}
