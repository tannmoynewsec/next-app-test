"use client";

const paymentButtonSnippet = `
  <form>
    <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_TP0zumcT3Weonf" async>
    </script>
  </form>
`;

export default function ConsultancyPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">PulseBytte</p>
            <h1 className="mt-1 text-xl font-bold text-slate-900">Consultancy Payment</h1>
          </div>
          <a
            href="/"
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Home
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.06)]">
          <div className="mb-5 border-b border-slate-200 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Payment</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">Professional Service</h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-6 text-slate-600">
              Pay securely with Razorpay for your consultancy appointment or service request.
            </p>

            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: paymentButtonSnippet }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
