import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <span className="text-xl font-bold tracking-tight">SimpliOnboard</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
          <Link href="/register" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Start Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Client onboarding that makes you look <span className="text-indigo-600">professional</span>
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto">
          Send one branded link. Your client fills out the form. You get their info, organized. Like HoneyBook, but simpler and half the price.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/register" className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-200">
            Start Free Trial — No Credit Card
          </Link>
          <span className="text-sm text-gray-400">$19/month after 7 days</span>
        </div>
      </section>

      {/* Trust signal */}
      <section className="max-w-4xl mx-auto px-6 pb-12 text-center">
        <p className="text-sm text-gray-400 mb-4">The freelancer tools people are leaving behind</p>
        <div className="flex justify-center gap-8 text-lg font-semibold text-gray-300">
          <span className="line-through">HoneyBook $39/mo</span>
          <span className="line-through">Bonsai $24/mo</span>
          <span className="line-through">Dubsado $40/mo</span>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create your form", desc: "Add your logo, pick your colors, set your questions. Takes 5 minutes." },
              { step: "2", title: "Send one link", desc: "Share your branded onboarding link with new clients wherever you talk to them." },
              { step: "3", title: "Get organized", desc: "Client fills out the form. You see their info instantly in your dashboard. No more lost emails." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - only what's actually built */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">What you get</h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              { title: "Branded intake forms", desc: "Your logo, your colors. Looks like you built it yourself." },
              { title: "One-link sharing", desc: "Copy a link, send it anywhere — email, DM, your website." },
              { title: "Custom fields", desc: "Text, long text, number, file upload — ask what you need." },
              { title: "Client submissions dashboard", desc: "All client responses in one place. Searchable, organized." },
              { title: "Contract text block", desc: "Include your contract terms. Clients agree before submitting." },
              { title: "7-day free trial", desc: "Full access, no credit card. Only pay when you're sure." },
            ].map((f) => (
              <div key={f.title} className="flex gap-3">
                <span className="text-indigo-600 text-lg mt-0.5">✓</span>
                <div><h3 className="font-semibold">{f.title}</h3><p className="text-gray-600 text-sm mt-1">{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-20" id="pricing">
        <div className="max-w-md mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
          <p className="text-gray-600 mb-8">One plan. Everything included. Cancel anytime.</p>
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="text-5xl font-bold mb-2">$19<span className="text-lg text-gray-400 font-normal">/month</span></div>
            <p className="text-gray-500 mb-6">7-day free trial. No credit card required.</p>
            <ul className="text-left space-y-3 mb-8">
              {["Unlimited onboarding forms", "Unlimited client submissions", "Custom branding & colors", "Contract agreement block", "Dashboard with client history", "Secure (Supabase + Vercel)"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/register" className="block w-full rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500">Start Free Trial</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Stop juggling emails and spreadsheets for every new client</h2>
        <p className="text-gray-600 mb-8">Join freelancers who want a simpler onboarding tool.</p>
        <Link href="/register" className="rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white hover:bg-gray-800">Get Started Free</Link>
      </section>

      <footer className="border-t py-8 text-center text-sm text-gray-400 space-x-4">
        <span>© 2026 SimpliOnboard</span>
        <Link href="/terms" className="hover:text-gray-600">Terms</Link>
        <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
        <Link href="/refund" className="hover:text-gray-600">Refund</Link>
      </footer>
    </div>
  );
}
