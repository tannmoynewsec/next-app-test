"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const currencyOptions = [
  { value: "INR", label: "Indian Rupee (₹)" },
  { value: "USD", label: "US Dollar ($)" },
];

const servicePurposeOptions = [
  "AI Integration",
  "MVP Development",
  "Automation Design",
  "Consultancy Support",
  "AI Workflow Setup",
  "General Enquiry",
];

const formatMoney = (value, currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export default function ConsultancyPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState("0");
  const [purpose, setPurpose] = useState(servicePurposeOptions[0]);
  const [client, setClient] = useState({
    name: "",
    business: "",
    contactType: "email",
    contactValue: "",
    gst: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const scriptUrl = "https://checkout.razorpay.com/v1/checkout.js";
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (existingScript) {
      if (window.Razorpay) {
        setIsRazorpayReady(true);
      }
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => setIsRazorpayReady(true);
    document.body.appendChild(script);
  }, []);

  const totalAmount = useMemo(() => {
    const numericAmount = Number(amount) || 0;
    return numericAmount > 0 ? numericAmount : 0;
  }, [amount]);

  const handleChange = (field) => (event) => {
    setClient((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (totalAmount <= 0) {
      setStatus({ type: "error", message: "Please enter an amount greater than zero." });
      return;
    }

    if (!isRazorpayReady || !window.Razorpay) {
      setStatus({ type: "error", message: "Razorpay is still loading. Please wait a moment and try again." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const packet = {
      id: `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
      currency,
      amount: totalAmount,
      purpose,
      clientName: client.name,
      businessName: client.business,
      contactType: client.contactType,
      contactValue: client.contactValue,
      gst: client.gst,
      notes: client.notes,
      paymentStatus: "pending",
      invoiceStatus: "draft",
    };

    const orderResponse = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create-order",
        amount: totalAmount,
        currency,
        purpose,
        clientName: client.name,
        businessName: client.business,
        contactValue: client.contactValue,
      }),
    });

    const orderResult = await orderResponse.json();

    if (!orderResponse.ok) {
      setStatus({ type: "error", message: orderResult.message || "Unable to start the payment." });
      setIsSubmitting(false);
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!publicKey) {
      setStatus({
        type: "error",
        message: "Razorpay public key is missing. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to your environment.",
      });
      setIsSubmitting(false);
      return;
    }

    const options = {
      key: publicKey,
      amount: orderResult.order.amount,
      currency: orderResult.order.currency,
      name: "PulseBytte",
      description: purpose,
      order_id: orderResult.order.id,
      handler: async function (response) {
        const verificationResponse = await fetch("/api/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify-payment",
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            record: packet,
          }),
        });

        const verificationResult = await verificationResponse.json();

        if (!verificationResponse.ok) {
          setStatus({ type: "error", message: verificationResult.message || "Payment verification failed." });
          setIsSubmitting(false);
          return;
        }

        router.push(
          `/consultancy/success?name=${encodeURIComponent(client.name)}&purpose=${encodeURIComponent(
            purpose,
          )}&contact=${encodeURIComponent(client.contactValue)}`,
        );
      },
      prefill: {
        name: client.name,
        email: client.contactType === "email" ? client.contactValue : "",
        contact: client.contactType === "phone" ? client.contactValue : "",
      },
      theme: {
        color: "#f59e0b",
      },
      modal: {
        ondismiss: () => {
          setIsSubmitting(false);
          setStatus({ type: "", message: "" });
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setIsSubmitting(false);
  };

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
          <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Payment</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">Professional service</h2>
            </div>
            <div className="rounded-full bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white">
              {formatMoney(totalAmount, currency)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-700">Currency</label>
                <select
                  value={currency}
                  onChange={(event) => setCurrency(event.target.value)}
                  className="request-input"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-700">Purpose</label>
                <select
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  className="request-input"
                >
                  {servicePurposeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-700">Custom amount</label>
              <input
                type="number"
                min="0"
                step="1"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="request-input"
                placeholder="Enter amount"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-700">Full name</label>
              <input
                type="text"
                value={client.name}
                onChange={handleChange("name")}
                className="request-input"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-700">Business name</label>
              <input
                type="text"
                value={client.business}
                onChange={handleChange("business")}
                className="request-input"
                placeholder="Company or business name"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-700">Contact method</label>
                <select
                  value={client.contactType}
                  onChange={handleChange("contactType")}
                  className="request-input"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-medium text-slate-700">
                  {client.contactType === "email" ? "Email address" : "Phone number"}
                </label>
                <input
                  type={client.contactType === "email" ? "email" : "tel"}
                  value={client.contactValue}
                  onChange={handleChange("contactValue")}
                  className="request-input"
                  placeholder={
                    client.contactType === "email" ? "name@example.com" : "+91 98765 43210"
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-700">GST / Tax ID (optional)</label>
              <input
                type="text"
                value={client.gst}
                onChange={handleChange("gst")}
                className="request-input"
                placeholder="GSTIN / tax reference"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-slate-700">Service notes</label>
              <textarea
                rows={3}
                value={client.notes}
                onChange={handleChange("notes")}
                className="request-input resize-y"
                placeholder="Describe the consultancy service required"
              />
            </div>

            {status.message && (
              <div
                className={`rounded-xl border px-3 py-2 text-sm ${
                  status.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || totalAmount <= 0 || !isRazorpayReady}
              className="w-full rounded-full bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Processing..."
                : !isRazorpayReady
                  ? "Loading Razorpay..."
                  : `Pay ${formatMoney(totalAmount, currency)}`}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
