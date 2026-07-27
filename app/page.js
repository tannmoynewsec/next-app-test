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
    name: "DataPulse",
    description:
      "A lightweight analytics helper that turns raw business data into clear weekly decision prompts.",
  },
  {
    name: "FlowBytte",
    description:
      "Workflow automation toolkit for repetitive operations across email, CRM, and internal task pipelines.",
  },
  {
    name: "Insight Briefs",
    description:
      "Auto-generated intelligence summaries that transform scattered updates into concise action briefs.",
  },
];

const services = [
  {
    title: "AI Integration",
    text: "Connect practical AI capabilities to your existing business stack without heavy change management.",
  },
  {
    title: "MVP Development",
    text: "Launch focused product prototypes fast, validate early, then iterate with market feedback.",
  },
  {
    title: "Automation Design",
    text: "Design and implement end-to-end automations that reduce manual work and improve execution speed.",
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <main className="pulse-shell min-h-screen">
      <header className="sticky top-0 z-30 border-b border-teal-900/10 bg-white/85 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="headline text-xl font-bold text-slate-900">
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

      <section id="top" className="mx-auto w-full max-w-6xl px-5 pt-14 pb-20 sm:px-8">
        <p className="lift-in mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-900 uppercase">
          Micro-SaaS Studio for AI + Automation
        </p>
        <h1 className="headline lift-in max-w-4xl text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-6xl">
          Welcome PulseBytte by Tanmoy
        </h1>
        <p className="lift-in mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
          We build practical AI tools and automation systems that help small teams ship faster,
          operate cleaner, and grow with less overhead.
        </p>
        <div className="lift-in mt-8 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="rounded-full bg-teal-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
          >
            Start a Conversation
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-teal-900/20 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
          >
            View Portfolio
          </a>
        </div>
      </section>

      <section id="about" className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
        <article className="section-card rounded-2xl p-6 sm:p-8">
          <h2 className="headline text-3xl font-semibold text-slate-900">About</h2>
          <p className="mt-4 max-w-4xl text-slate-700 leading-8">
            PulseBytte started as a product-first experiment and evolved into a focused studio that
            helps businesses adopt AI and automation through practical, lean execution. We blend
            strategy, prototyping, and implementation to turn ideas into usable outcomes quickly.
          </p>
        </article>
      </section>

      <section id="portfolio" className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="headline text-3xl font-semibold text-slate-900">Portfolio</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {portfolioItems.map((item) => (
            <article key={item.name} className="section-card rounded-2xl p-6">
              <h3 className="headline text-2xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8">
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

      <section id="contact" className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <article className="section-card rounded-2xl bg-slate-900 p-7 text-slate-100 sm:p-9">
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
            <a
              href="https://www.linkedin.com/company/pulsebytte"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-300/30 px-6 py-3 text-sm font-bold text-slate-100 transition hover:bg-slate-800"
            >
              LinkedIn Company
            </a>
          </div>
        </article>
      </section>

      <footer className="border-t border-slate-900/10 bg-white/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 text-sm text-slate-700 sm:px-8 md:flex-row md:items-center">
          <p>© {currentYear} PulseBytte. All rights reserved.</p>
          <a
            href="https://www.linkedin.com/company/pulsebytte"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-800 transition hover:text-teal-700"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
