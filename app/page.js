export default function Home() {
  const services = [
    {
      title: "Brand Strategy",
      text: "Shape a sharp story and a voice your audience remembers.",
    },
    {
      title: "Web Experience",
      text: "Design and build fast websites focused on trust and conversion.",
    },
    {
      title: "Growth Content",
      text: "Publish focused content that attracts leads and turns interest into action.",
    },
  ];

  const process = [
    "Discover goals, audience, and market opportunities.",
    "Design a modern identity and conversion-focused layout.",
    "Launch, measure, and improve with clear weekly iterations.",
  ];

  return (
    <main className="pulse-shell min-h-screen px-5 py-12 sm:px-10 lg:px-16">
      <section className="section-card mx-auto w-full max-w-6xl rounded-3xl p-7 sm:p-10 lg:p-14">
        <div className="lift-in" style={{ animationDelay: "100ms" }}>
          <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-900 uppercase">
            Digital Growth Studio
          </p>
          <h1 className="headline max-w-4xl text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-7xl">
            Welcome PulseBytte by Tanmoy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
            A bold and modern landing page inspired by high-impact agency websites,
            crafted to present your services, process, and brand confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, index) => (
            <article
              key={item.title}
              className="lift-in rounded-2xl border border-emerald-900/12 bg-white/70 p-5"
              style={{ animationDelay: `${220 + index * 90}ms` }}
            >
              <h2 className="headline text-2xl font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="lift-in rounded-2xl border border-slate-900/10 bg-gradient-to-br from-white to-emerald-50 p-6"
            style={{ animationDelay: "520ms" }}
          >
            <h3 className="headline text-3xl font-semibold text-slate-900">
              Our Build Flow
            </h3>
            <ol className="mt-4 space-y-3 text-slate-700">
              {process.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-teal-700" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside
            className="lift-in rounded-2xl bg-emerald-900 p-6 text-emerald-50"
            style={{ animationDelay: "640ms" }}
          >
            <h3 className="headline text-2xl font-semibold">Ready to Launch</h3>
            <p className="mt-3 text-sm leading-7 text-emerald-100">
              This website is export-ready for Hostinger, lightweight for fast loading,
              and simple to maintain as your business grows.
            </p>
            <a
              href="#"
              className="mt-6 inline-block rounded-full bg-amber-400 px-6 py-3 text-sm font-bold tracking-wide text-slate-900 transition hover:bg-amber-300"
            >
              Start Your Project
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
