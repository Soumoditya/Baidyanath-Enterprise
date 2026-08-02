import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  increment,
  setDoc,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./config";
import { Product } from "@/types/product";
import { Order, OrderStatus } from "@/types/order";

function toDate(ts: unknown): Date {
  if (ts instanceof Timestamp) return ts.toDate();
  if (ts instanceof Date) return ts;
  return new Date();
}

/**
 * Firestore rejects `undefined` field values outright. Optional fields left
 * blank (email, notes, mrp, …) would otherwise abort the whole write, so drop
 * them before sending.
 */
function stripUndefined<T extends Record<string, unknown>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => v !== undefined)
  ) as T;
}

function sortByCreatedAtDesc<T extends { createdAt: Date }>(rows: T[]): T[] {
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// ── Products ──

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, "products"), orderBy("sortOrder", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      slug: data.slug,
      description: data.description || { en: "" },
      price: data.price,
      mrp: data.mrp,
      category: data.category,
      imageUrl: data.imageUrl || "",
      imagePublicId: data.imagePublicId,
      inStock: data.inStock ?? true,
      unit: data.unit || "",
      featured: data.featured ?? false,
      sortOrder: data.sortOrder ?? 0,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    } as Product;
  });
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, "products"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  const data = d.data();
  return {
    id: d.id,
    name: data.name,
    slug: data.slug,
    description: data.description || { en: "" },
    price: data.price,
    mrp: data.mrp,
    category: data.category,
    imageUrl: data.imageUrl || "",
    imagePublicId: data.imagePublicId,
    inStock: data.inStock ?? true,
    unit: data.unit || "",
    featured: data.featured ?? false,
    sortOrder: data.sortOrder ?? 0,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  } as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const d = await getDoc(doc(db, "products", id));
  if (!d.exists()) return null;
  const data = d.data();
  return {
    id: d.id,
    name: data.name,
    slug: data.slug,
    description: data.description || { en: "" },
    price: data.price,
    mrp: data.mrp,
    category: data.category,
    imageUrl: data.imageUrl || "",
    imagePublicId: data.imagePublicId,
    inStock: data.inStock ?? true,
    unit: data.unit || "",
    featured: data.featured ?? false,
    sortOrder: data.sortOrder ?? 0,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  } as Product;
}

export async function addProduct(
  product: Omit<Product, "id" | "createdAt" | "updatedAt">
) {
  const now = Timestamp.now();
  return addDoc(collection(db, "products"), {
    ...stripUndefined(product),
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>
) {
  return updateDoc(doc(db, "products", id), {
    ...stripUndefined(data),
    updatedAt: Timestamp.now(),
  });
}

export async function deleteProduct(id: string) {
  return deleteDoc(doc(db, "products", id));
}

// ── Orders ──

export async function createOrder(
  order: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">
): Promise<string> {
  const now = Timestamp.now();
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;

  const counterRef = doc(db, "counters", "orders");
  try {
    await updateDoc(counterRef, { count: increment(1) });
  } catch {
    await setDoc(counterRef, { count: 1 });
  }
  const counterSnap = await getDoc(counterRef);
  const count = counterSnap.data()?.count || 1;
  const orderNumber = `BE-${dateStr}-${String(count).padStart(3, "0")}`;

  await addDoc(collection(db, "orders"), {
    ...stripUndefined(order),
    orderNumber,
    createdAt: now,
    updatedAt: now,
  });

  return orderNumber;
}

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapOrder);
}

function mapOrder(d: QueryDocumentSnapshot<DocumentData>): Order {
  const data = d.data();
  return {
    id: d.id,
    orderNumber: data.orderNumber,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    customerEmail: data.customerEmail,
    customerAddress: data.customerAddress,
    userId: data.userId,
    items: data.items,
    subtotal: data.subtotal,
    total: data.total,
    status: data.status,
    notes: data.notes,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  } as Order;
}

// NOTE: deliberately no `orderBy` here — combining it with `where` would need a
// composite index. Sorting client-side keeps lookups working with zero setup.
export async function getOrdersByPhone(phone: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("customerPhone", "==", phone));
  const snapshot = await getDocs(q);
  return sortByCreatedAtDesc(snapshot.docs.map(mapOrder));
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return sortByCreatedAtDesc(snapshot.docs.map(mapOrder));
}

export async function getOrderById(id: string): Promise<Order | null> {
  const d = await getDoc(doc(db, "orders", id));
  if (!d.exists()) return null;
  return mapOrder(d as QueryDocumentSnapshot<DocumentData>);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return updateDoc(doc(db, "orders", id), {
    status,
    updatedAt: Timestamp.now(),
  });
}
