import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();

  const filePath = path.join(process.cwd(), "data", "payments.json");
  const file = await fs.readFile(filePath, "utf-8").catch(() => "[]");
  const payments = JSON.parse(file);

  const invoice = {
    ...body,
    paymentStatus: body.paymentStatus || "pending",
    invoiceStatus: body.invoiceStatus || "draft",
  };

  payments.push(invoice);
  await fs.writeFile(filePath, JSON.stringify(payments, null, 2));

  return Response.json({
    success: true,
    invoiceId: invoice.id,
    message: "Payment record saved successfully.",
  });
}

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "payments.json");
  const file = await fs.readFile(filePath, "utf-8").catch(() => "[]");
  const payments = JSON.parse(file);

  return Response.json({ payments });
}
