export async function sendReceiptSync(email: string, invoiceId: string): Promise<void> {
  await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    body: JSON.stringify({ To: email, Subject: `Receipt for ${invoiceId}` }),
  });
}
