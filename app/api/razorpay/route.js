import crypto from "crypto";
import Razorpay from "razorpay";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

const getClient = () => {
  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set.");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

const readPaymentsFile = async () => {
  const filePath = path.join(process.cwd(), "data", "payments.json");
  const file = await fs.readFile(filePath, "utf-8").catch(() => "[]");
  return JSON.parse(file);
};

export async function POST(request) {
  const body = await request.json();

  if (!body || !body.action) {
    return Response.json({ success: false, message: "Missing action." }, { status: 400 });
  }

  if (body.action === "create-order") {
    try {
      const razorpay = getClient();
      const amount = Number(body.amount) || 0;

      if (amount <= 0) {
        return Response.json({ success: false, message: "Amount must be greater than zero." }, { status: 400 });
      }

      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: (body.currency || "INR").toUpperCase(),
        receipt: `rcpt_${Date.now()}`,
        notes: {
          purpose: body.purpose || "Consultancy service",
          clientName: body.clientName || "",
          businessName: body.businessName || "",
          contactValue: body.contactValue || "",
        },
      });

      return Response.json({ success: true, order });
    } catch (error) {
      return Response.json(
        { success: false, message: error.message || "Unable to create Razorpay order." },
        { status: 500 },
      );
    }
  }

  if (body.action === "verify-payment") {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature, record } = body;

      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return Response.json({ success: false, message: "Payment verification payload is incomplete." }, { status: 400 });
      }

      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const isValid = crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(razorpay_signature),
      );

      if (!isValid) {
        return Response.json({ success: false, message: "Payment signature verification failed." }, { status: 400 });
      }

      const payments = await readPaymentsFile();
      const savedRecord = {
        ...(record || {}),
        id: record?.id || `INV-${Date.now()}`,
        createdAt: record?.createdAt || new Date().toISOString(),
        paymentStatus: "paid",
        invoiceStatus: "issued",
        razorpay: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          signature: razorpay_signature,
        },
      };

      payments.push(savedRecord);
      await fs.writeFile(path.join(process.cwd(), "data", "payments.json"), JSON.stringify(payments, null, 2));

      return Response.json({ success: true, message: "Payment verified successfully." });
    } catch (error) {
      return Response.json(
        { success: false, message: error.message || "Unable to verify payment." },
        { status: 500 },
      );
    }
  }

  return Response.json({ success: false, message: "Unsupported action." }, { status: 400 });
}

export async function GET() {
  const payments = await readPaymentsFile();
  return Response.json({ payments });
}
