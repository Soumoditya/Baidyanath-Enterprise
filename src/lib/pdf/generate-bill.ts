import { Order } from "@/types/order";

export async function generateBill(order: Order) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Baidyanath Enterprise", 105, 20, { align: "center" });

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Opp. Dinabandhu Club, Chaldhoani Para, Ward 11, Rampurhat-I, Birbhum, WB - 731224",
    105,
    27,
    { align: "center" }
  );
  doc.text("Phone: +91 9932132957 | Email: baidya.ent@gmail.com", 105, 32, {
    align: "center",
  });

  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.5);
  doc.line(15, 36, 195, 36);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 105, 44, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const infoY = 52;
  doc.text(`Order No: ${order.orderNumber}`, 15, infoY);
  doc.text(
    `Date: ${order.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`,
    140,
    infoY
  );
  doc.text(`Customer: ${order.customerName}`, 15, infoY + 6);
  doc.text(`Phone: ${order.customerPhone}`, 15, infoY + 12);
  if (order.customerAddress) {
    doc.text(`Address: ${order.customerAddress}`, 15, infoY + 18);
  }

  const tableData = order.items.map((item, i) => [
    String(i + 1),
    item.name,
    item.unit,
    String(item.quantity),
    `Rs. ${item.price.toFixed(2)}`,
    `Rs. ${(item.price * item.quantity).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: infoY + 26,
    head: [["#", "Product", "Unit", "Qty", "Price", "Total"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
    },
    styles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 12 },
      1: { cellWidth: 65 },
      4: { halign: "right" },
      5: { halign: "right" },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable?.finalY || 150;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total: Rs. ${order.total.toFixed(2)}`, 195, finalY + 10, {
    align: "right",
  });

  doc.setDrawColor(37, 99, 235);
  doc.line(15, finalY + 16, 195, finalY + 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Payment via UPI: baidya.ent@okhdfcbank", 105, finalY + 23, {
    align: "center",
  });
  doc.text("Thank you for your business!", 105, finalY + 29, {
    align: "center",
  });

  doc.save(`Baidyanath-Invoice-${order.orderNumber}.pdf`);
}
