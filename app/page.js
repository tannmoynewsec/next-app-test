"use client";

import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const portfolioItems = [
  {
    name: "AI Agent",
    description:
      "Micro-SaaS agent products for support, lead qualification, and task assistance across business workflows.",
  },
  {
    name: "AI Workflows",
    description:
      "Connected AI workflow products that orchestrate data intake, reasoning, and action across your tool stack.",
  },
  {
    name: "AI Routines",
    description:
      "Recurring automation products that run daily and weekly routines to reduce repetitive operational overhead.",
  },
  {
    name: "Ontology",
    description:
      "Ontology-driven knowledge maps that improve consistency, retrieval, and decision quality in AI products.",
  },
];

const services = [
  {
    title: "AI Integration",
    text: "Integrate practical AI capabilities into your existing stack as productized Micro-SaaS modules.",
  },
  {
    title: "MVP Development",
    text: "Launch focused AI/automation MVPs quickly, validate early, then iterate as scalable Micro-SaaS products.",
  },
  {
    title: "Automation Design",
    text: "Design product-grade automation flows that reduce manual work and improve execution speed.",
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/pulsebytte",
    textClass: "text-teal-800 hover:text-teal-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M4.98 3.5a2.48 2.48 0 1 0 0 4.96 2.48 2.48 0 0 0 0-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1.01 1.83-2.07 3.77-2.07 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.5c0-1.31-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4V9Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/pulsebytte",
    textClass: "text-slate-800 hover:text-slate-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.78-6.24L6.66 22H3.54l7.23-8.27L1 2h6.25l4.32 5.7L18.9 2Zm-1.07 18h1.69L6.33 3.9H4.51L17.83 20Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@PulseBytte",
    textClass: "text-rose-700 hover:text-rose-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M21.58 7.19a2.99 2.99 0 0 0-2.1-2.12C17.63 4.5 12 4.5 12 4.5s-5.63 0-7.48.57a2.99 2.99 0 0 0-2.1 2.12A31.24 31.24 0 0 0 2 12a31.24 31.24 0 0 0 .42 4.81 2.99 2.99 0 0 0 2.1 2.12c1.85.57 7.48.57 7.48.57s5.63 0 7.48-.57a2.99 2.99 0 0 0 2.1-2.12A31.24 31.24 0 0 0 22 12a31.24 31.24 0 0 0-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [waves, setWaves] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [request, setRequest] = useState({
    name: "",
    email: "",
    hours: "2",
    focus: "AI Integration",
    notes: "",
  });
  const currentYear = new Date().getFullYear();

  const handleRequestChange = (field) => (event) => {
    setRequest((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "c8a882b9-e635-42de-a143-05ba2f6cc13c");

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! Your message has been sent.");
        setRequest({
          name: "",
          email: "",
          hours: "2",
          focus: "AI Integration",
          notes: "",
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const createWave = (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const wave = {
      id: `${Date.now()}-${Math.random()}`,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      size: 200 + Math.round(Math.random() * 120),
      tilt: -12 + Math.round(Math.random() * 24),
    };

    setWaves((prev) => [...prev.slice(-7), wave]);

    setTimeout(() => {
      setWaves((prev) => prev.filter((item) => item.id !== wave.id));
    }, 1200);
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--pointer-x", `${x}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}px`);
  };

  const handlePointerLeave = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${rect.width / 2}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${rect.height / 2}px`);
  };

  return (
    <main
      className="pulse-shell flex min-h-screen flex-col overflow-hidden"
      onPointerDown={createWave}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="wave-layer" aria-hidden="true">
        {waves.map((wave) => (
          <span
            key={wave.id}
            className="click-wave"
            style={{
              left: `${wave.x}px`,
              top: `${wave.y}px`,
              width: `${wave.size}px`,
              height: `${wave.size}px`,
              "--tilt": `${wave.tilt}deg`,
            }}
          />
        ))}
      </div>

      <div className="ambient-orb orb-one" aria-hidden="true" />
      <div className="ambient-orb orb-two" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="glass-nav sticky top-0 z-30 border-b border-teal-900/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="headline text-xl font-bold text-slate-900 sm:text-2xl">
            PulseBytte
          </a>

          <button
            type="button"
            className="inline-flex rounded-md border border-teal-900/20 px-3 py-2 text-sm font-semibold text-slate-800 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-teal-800">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {isOpen && (
          <nav className="mx-5 mb-4 rounded-xl border border-teal-900/12 bg-white p-4 md:hidden">
            <ul className="space-y-2 text-sm font-semibold text-slate-700">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 transition hover:bg-emerald-50 hover:text-teal-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <section id="top" className="mx-auto w-full max-w-6xl px-5 pt-7 pb-7 sm:px-8">
        <div className="hero-grid section-card rounded-3xl p-5 sm:p-7">
          <div>
            <p className="lift-in mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-900 uppercase">
              Micro-SaaS Studio for AI + Automation
            </p>
            <h1 className="headline lift-in max-w-4xl text-3xl leading-tight font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              <span className="shimmer-title">Welcome PulseBytte</span>
            </h1>
            <p className="lift-in mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
              PulseBytte builds focused Micro-SaaS products for AI and automation, primarily for
              small and micro entrepreneurs who want to launch faster, operate cleaner, and scale
              without heavy complexity.
            </p>
            <div className="lift-in mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-emerald-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Start a Conversation
              </a>
              <a
                href="/consultancy"
                className="rounded-full border border-emerald-800/20 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100"
              >
                Consultancy Payment
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-teal-900/20 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                View Portfolio
              </a>
            </div>
          </div>

          <aside className="hero-spotlight lift-in rounded-2xl p-5 sm:p-6" style={{ animationDelay: "120ms" }}>
            <p className="text-sm font-semibold text-teal-900">Fast-start Consultancy</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Start with a clear Micro-SaaS roadmap in your first block of hours. Ideal for teams
              validating AI and automation opportunities before full builds.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="metric-chip rounded-xl p-3">
                <p className="headline text-2xl text-slate-900">2h</p>
                <p className="text-xs text-slate-600">Kickoff</p>
              </div>
              <div className="metric-chip metric-chip-float rounded-xl p-3">
                <p className="headline text-2xl text-slate-900">3x</p>
                <p className="text-xs text-slate-600">Faster Ops</p>
              </div>
              <div className="metric-chip metric-chip-float-delayed rounded-xl p-3">
                <p className="headline text-2xl text-slate-900">MVP</p>
                <p className="text-xs text-slate-600">Focused</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-4 sm:px-8" aria-label="Motion tagline strip">
        <div className="ticker-shell">
          <div className="ticker-track">
            <span>AI AGENTS</span>
            <span>MICRO-SAAS</span>
            <span>AUTOMATION FLOWS</span>
            <span>ONTOLOGY SYSTEMS</span>
            <span>AI AGENTS</span>
            <span>MICRO-SAAS</span>
            <span>AUTOMATION FLOWS</span>
            <span>ONTOLOGY SYSTEMS</span>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <article className="section-card rounded-2xl p-6 sm:p-8">
          <h2 className="headline text-3xl font-semibold text-slate-900">About</h2>
          <p className="mt-4 max-w-4xl text-slate-700 leading-8">
            PulseBytte is a Micro-SaaS Studio for AI + Automation. We design and ship lightweight,
            outcome-focused products for small and micro entrepreneurs that solve specific business
            bottlenecks with practical AI, clear workflows, and fast implementation cycles.
          </p>
        </article>
      </section>

      <section id="portfolio" className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <h2 className="headline text-3xl font-semibold text-slate-900">Portfolio</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {portfolioItems.map((item) => (
            <article key={item.name} className="section-card rounded-2xl p-6">
              <h3 className="headline text-2xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
              {item.name === "Ontology" && (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200/80 bg-white/80 p-2">
                  <img
                    src="/ontology-map.svg"
                    alt="Ontology concept map showing entities and relationships"
                    width="1200"
                    height="700"
                    className="h-auto w-full rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <h2 className="headline text-3xl font-semibold text-slate-900">Services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="section-card rounded-2xl p-6">
              <h3 className="headline text-2xl font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
        <article className="rounded-2xl border border-slate-700/55 bg-[linear-gradient(160deg,rgba(15,23,42,0.88),rgba(30,41,59,0.84))] p-7 text-slate-200 shadow-[0_18px_34px_rgba(2,6,23,0.32)] sm:p-9">
          <h2 className="headline text-3xl font-semibold">Contact</h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-300">
            Looking for AI integration, MVP product support, or workflow automation help? Let’s talk.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="mailto:info@pulsebytte.com"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300"
            >
              info@pulsebytte.com
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <h3 className="headline text-2xl font-semibold text-white">Request Consultancy Hours</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Fill in the brief and submit with one click.
            </p>

            <form id="form" onSubmit={handleFormSubmit} className="mt-5">
              <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block font-semibold text-slate-200">Your Name</span>
                <input
                  type="text"
                  name="name"
                  value={request.name}
                  onChange={handleRequestChange("name")}
                  placeholder="Enter your name"
                  className="request-input"
                  required
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-semibold text-slate-200">Email</span>
                <input
                  type="email"
                  name="email"
                  value={request.email}
                  onChange={handleRequestChange("email")}
                  placeholder="you@company.com"
                  className="request-input"
                  required
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-semibold text-slate-200">Hours Needed</span>
                <input
                  type="number"
                  name="hours"
                  min="1"
                  max="200"
                  value={request.hours}
                  onChange={handleRequestChange("hours")}
                  className="request-input"
                  required
                />
              </label>
              <label className="text-sm">
                <span className="mb-1 block font-semibold text-slate-200">Focus Area</span>
                <select
                  name="focus"
                  value={request.focus}
                  onChange={handleRequestChange("focus")}
                  className="request-input"
                >
                  <option>AI Integration</option>
                  <option>MVP Development</option>
                  <option>Automation Design</option>
                </select>
              </label>
              </div>

              <label className="mt-4 block text-sm">
                <span className="mb-1 block font-semibold text-slate-200">Project Notes</span>
                <textarea
                  name="notes"
                  rows={4}
                  value={request.notes}
                  onChange={handleRequestChange("notes")}
                  placeholder="Share timeline, goals, and expected outcomes"
                  className="request-input resize-y"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Consultancy Request"}
              </button>
            </form>
          </div>
        </article>
      </section>

      <footer className="mt-auto border-t border-slate-900/10 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 text-sm text-slate-700 sm:px-8 md:flex-row md:items-center">
          <p>© {currentYear} PulseBytte. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`inline-flex items-center justify-center transition ${link.textClass}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
