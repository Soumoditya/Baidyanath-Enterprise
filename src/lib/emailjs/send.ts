import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ORDER = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ORDER || "";
const TEMPLATE_ADMIN = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ADMIN || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

interface OrderEmailParams {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNumber: string;
  orderTotal: string;
  itemsSummary: string;
}

export async function sendOrderConfirmation(params: OrderEmailParams) {
  if (!SERVICE_ID || !TEMPLATE_ORDER || !PUBLIC_KEY || !params.customerEmail)
    return;
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ORDER,
      {
        to_name: params.customerName,
        to_email: params.customerEmail,
        order_number: params.orderNumber,
        order_total: params.orderTotal,
        items_summary: params.itemsSummary,
      },
      PUBLIC_KEY
    );
  } catch {
    console.error("Failed to send order confirmation email");
  }
}

export async function sendAdminNotification(params: OrderEmailParams) {
  if (!SERVICE_ID || !TEMPLATE_ADMIN || !PUBLIC_KEY) return;
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ADMIN,
      {
        customer_name: params.customerName,
        customer_phone: params.customerPhone,
        customer_email: params.customerEmail || "Not provided",
        order_number: params.orderNumber,
        order_total: params.orderTotal,
        items_summary: params.itemsSummary,
      },
      PUBLIC_KEY
    );
  } catch {
    console.error("Failed to send admin notification email");
  }
}
