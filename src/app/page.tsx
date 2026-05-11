import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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
          One branded link sends your clients through intake form, contract signing, and payment — all in one flow. Like HoneyBook, but simpler and half the price.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/register" className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-200">
            Start Free Trial — No Credit Card
          </Link>
          <span className="text-sm text-gray-400">$19/month after 14 days</span>
        </div>
      </section>

      {/* Trust signal */}
      <section className="max-w-4xl mx-auto px-6 pb-12 text-center">
        <p className="text-sm text-gray-400 mb-4">Trusted by freelancers who switched from</p>
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
              { step: "1", title: "Create your form", desc: "Add your logo, set your questions, upload your contract template. Takes 10 minutes." },
              { step: "2", title: "Send one link", desc: "Share your branded onboarding link with new clients via email, DM, or your website." },
              { step: "3", title: "Client completes everything", desc: "They fill the form, e-sign the contract, and pay the deposit — all in one flow." },
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

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need</h2>
          <div className="grid grid-cols-2 gap-8">
            {[
              { title: "Branded intake forms", desc: "Your logo, your colors, your domain. Looks like you built it yourself." },
              { title: "E-signatures built in", desc: "No more PDF → email → scan → send back. One click and it's signed." },
              { title: "Payment collection", desc: "Collect deposits upfront via credit card. Powered by Stripe." },
              { title: "Auto-generated project summary", desc: "System creates a clean PDF with everything the client submitted." },
              { title: "Automated welcome emails", desc: "Client completes onboarding → they get a professional welcome email instantly." },
              { title: "Client portal", desc: "Clients log in to see project status, shared files, invoices, and to-dos." },
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
          <p className="text-gray-600 mb-8">One plan. All features. No surprises.</p>
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="text-5xl font-bold mb-2">$19<span className="text-lg text-gray-400 font-normal">/month</span></div>
            <p className="text-gray-500 mb-6">14-day free trial. Cancel anytime.</p>
            <ul className="text-left space-y-3 mb-8">
              {["Unlimited onboarding forms", "Unlimited clients", "E-signatures", "Payment collection", "Custom branding", "Client portal", "Email automation"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">✓</span> {f}</li>
              ))}
            </ul>
            <Link href="/register" className="block w-full rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500">Start Free Trial</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Stop losing clients to a messy onboarding process</h2>
        <p className="text-gray-600 mb-8">Join freelancers who switched from HoneyBook, Bonsai, and Dubsado.</p>
        <Link href="/register" className="rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white hover:bg-gray-800">Get Started Free</Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-gray-400">
        © 2026 SimpliOnboard. Built for freelancers.
      </footer>
    </div>
  );
}
