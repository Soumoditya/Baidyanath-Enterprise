// Helpers for WhatsApp ordering / enquiries to Baidyanath Enterprise.
// Mid-age customers often prefer WhatsApp over online checkout, so we make it
// available everywhere with a pre-filled, ready-to-send message.

export const WHATSAPP_PHONE = "919932132957"; // +91 99321 32957

export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME || "Baidyanath Enterprise";

function build(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Generic "chat with us" link. */
export function whatsappChatUrl(): string {
  return build(
    `Hello ${BUSINESS_NAME}, I would like to know more about your products.`
  );
}

/** Enquiry / order for a single product. */
export function whatsappProductUrl(productName: string, unit?: string): string {
  const line = unit ? `${productName} (${unit})` : productName;
  return build(
    `Hello ${BUSINESS_NAME}, I want to order:\n• ${line}\n\nPlease share availability and price.`
  );
}

interface WaCartItem {
  name: string;
  quantity: number;
  price: number;
  unit?: string;
}

/** Order message summarising the whole cart. */
export function whatsappOrderUrl(items: WaCartItem[], total: number): string {
  const lines = items
    .map(
      (i) =>
        `• ${i.name}${i.unit ? ` (${i.unit})` : ""} × ${i.quantity} — ₹${(
          i.price * i.quantity
        ).toLocaleString("en-IN")}`
    )
    .join("\n");
  const message = `Hello ${BUSINESS_NAME}, I would like to place an order:\n\n${lines}\n\nTotal: ₹${total.toLocaleString(
    "en-IN"
  )}\n\nPlease confirm availability and delivery.`;
  return build(message);
}

/** Wholesale / bulk quote request for retailers. */
export function whatsappBulkUrl(): string {
  return build(
    `Hello ${BUSINESS_NAME}, I run a shop and would like wholesale/bulk rates. Please share your distributor price list. My requirement:\n\n(Product & quantity)`
  );
}

/** Direct call link. */
export const CALL_URL = "tel:+919932132957";
