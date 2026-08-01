export type OrderStatus =
  | "pending_payment"
  | "payment_received"
  | "processing"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  unit: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "pending_payment",
  "payment_received",
  "processing",
  "delivered",
];
