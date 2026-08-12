"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Client";
  const purpose = searchParams.get("purpose") || "Consultancy service";
  const contact = searchParams.get("contact") || "your contact details";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-emerald-200 bg-white p-8 shadow-sm">
        <div className="mb-5 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Payment received
        </div>

        <h1 className="text-3xl font-bold text-slate-900">Thank you, {name}</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Your request for <span className="font-semibold text-slate-900">{purpose}</span> has been received.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">We will contact you at</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{contact}</p>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-600">
          A confirmation record has been created for future invoice and tax documentation.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/consultancy"
            className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-600"
          >
            Make another request
          </a>
          <a
            href="/"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-600">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
