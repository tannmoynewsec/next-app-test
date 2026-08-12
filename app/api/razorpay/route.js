export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    success: true,
    message: "Button-based Razorpay integration is active. No private API key is required.",
  });
}

export async function POST() {
  return Response.json(
    { success: false, message: "Button-based Razorpay integration does not use this endpoint." },
    { status: 400 },
  );
}
