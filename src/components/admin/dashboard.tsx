"use client";

import { Link } from "@/i18n/navigation";
import { Product } from "@/types/product";
import { Order, OrderStatus } from "@/types/order";
import { formatPrice } from "@/lib/utils";
import { getCategoryLabel } from "@/types/product";
import AnimatedCounter from "@/components/shared/animated-counter";

interface Props {
  products: Product[];
  orders: Order[];
}

const STATUS_META: Record<OrderStatus, { label: string; dot: string; chip: string }> = {
  pending_payment: { label: "Pending", dot: "bg-amber-500", chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  payment_received: { label: "Paid", dot: "bg-blue-500", chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  processing: { label: "Processing", dot: "bg-indigo-500", chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" },
  delivered: { label: "Delivered", dot: "bg-green-500", chip: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
  cancelled: { label: "Cancelled", dot: "bg-slate-400", chip: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
};

function daysAgo(n: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

export default function Dashboard({ products, orders }: Props) {
  const paid = orders.filter((o) => o.status !== "pending_payment" && o.status !== "cancelled");
  const revenue = paid.reduce((s, o) => s + (o.total || 0), 0);
  const pending = orders.filter((o) => o.status === "pending_payment").length;
  const outOfStock = products.filter((p) => !p.inStock);
  const aov = paid.length ? Math.round(revenue / paid.length) : 0;

  // ── 14-day orders series ──
  const series: { label: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const start = daysAgo(i);
    const end = daysAgo(i - 1);
    const count = orders.filter((o) => o.createdAt >= start && o.createdAt < end).length;
    series.push({ label: `${start.getDate()}`, count });
  }
  const maxCount = Math.max(1, ...series.map((s) => s.count));

  // area chart geometry
  const W = 640, H = 160, P = 8;
  const stepX = (W - P * 2) / (series.length - 1);
  const pts = series.map((s, i) => {
    const x = P + i * stepX;
    const y = H - P - (s.count / maxCount) * (H - P * 2);
    return [x, y] as const;
  });
  const linePath = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)},${H - P} L${pts[0][0].toFixed(1)},${H - P} Z`;

  // status breakdown
  const statuses = Object.keys(STATUS_META) as OrderStatus[];
  const statusCounts = statuses.map((s) => ({ s, n: orders.filter((o) => o.status === s).length }));
  const maxStatus = Math.max(1, ...statusCounts.map((x) => x.n));

  const kpis = [
    { label: "Revenue", value: revenue, prefix: "₹", accent: "text-primary-600 dark:text-primary-400", ring: "ring-primary-100 dark:ring-primary-900/40" },
    { label: "Orders", value: orders.length, accent: "text-slate-900 dark:text-white", ring: "ring-slate-100 dark:ring-slate-700" },
    { label: "Avg. Order", value: aov, prefix: "₹", accent: "text-slate-900 dark:text-white", ring: "ring-slate-100 dark:ring-slate-700" },
    { label: "Pending", value: pending, accent: "text-amber-600 dark:text-amber-400", ring: "ring-amber-100 dark:ring-amber-900/40" },
    { label: "Out of Stock", value: outOfStock.length, accent: "text-red-600 dark:text-red-400", ring: "ring-red-100 dark:ring-red-900/40" },
  ];

  const recent = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* KPI row — primary (Revenue) dominates */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <div className="col-span-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-primary-600 to-primary-800 p-5 text-white shadow-[var(--shadow-glow)] lg:col-span-2 lg:row-span-1">
          <p className="text-sm font-medium text-primary-100">Revenue (confirmed)</p>
          <p className="font-display mt-1 text-4xl">
            <AnimatedCounter to={revenue} prefix="₹" />
          </p>
          <p className="mt-1 text-sm text-primary-100">{paid.length} paid orders · avg {formatPrice(aov)}</p>
        </div>
        {kpis.slice(1).map((k) => (
          <div
            key={k.label}
            className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] ring-1 ${k.ring} dark:border-slate-700 dark:bg-slate-800`}
          >
            <p className={`font-display text-3xl ${k.accent}`}>
              <AnimatedCounter to={k.value} prefix={k.prefix ?? ""} />
            </p>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Orders over time */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg text-slate-900 dark:text-white">Orders — last 14 days</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">{series.reduce((s, x) => s + x.count, 0)} total</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#area)" />
            <path d={linePath} fill="none" stroke="rgb(37 99 235)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgb(37 99 235)" />
            ))}
          </svg>
        </div>

        {/* Orders by status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] dark:border-slate-700 dark:bg-slate-800">
          <h3 className="font-display mb-4 text-lg text-slate-900 dark:text-white">By status</h3>
          <div className="space-y-3">
            {statusCounts.map(({ s, n }) => (
              <div key={s}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <span className={`h-2 w-2 rounded-full ${STATUS_META[s].dot}`} />
                    {STATUS_META[s].label}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">{n}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div className={`h-full rounded-full ${STATUS_META[s].dot}`} style={{ width: `${(n / maxStatus) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] lg:col-span-2 dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg text-slate-900 dark:text-white">Recent orders</h3>
            <Link href="/admin/orders" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">View all</Link>
          </div>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">No orders yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recent.map((o) => (
                <Link
                  key={o.id}
                  href={`/admin/orders/${o.id}`}
                  className="flex items-center justify-between gap-3 py-3 transition-colors hover:opacity-80"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900 dark:text-white">{o.orderNumber}</p>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">{o.customerName} · {o.customerPhone}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(o.total)}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_META[o.status].chip}`}>
                      {STATUS_META[o.status].label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Stock alerts */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg text-slate-900 dark:text-white">Out of stock</h3>
            <Link href="/admin/products" className="text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400">Manage</Link>
          </div>
          {outOfStock.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Everything is in stock.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {outOfStock.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/products/${p.id}/edit`} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <span className="min-w-0 truncate text-sm font-medium text-slate-700 dark:text-slate-200">{p.name.en}</span>
                    <span className="shrink-0 text-xs text-slate-400">{getCategoryLabel(p.category)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
