export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose space-y-4 text-gray-700">
        <p>Last updated: May 12, 2026</p>
        <h2 className="text-xl font-semibold mt-4">1. Data We Collect</h2>
        <p>We collect your email, name, and the information you choose to include in your onboarding forms. We do not sell your data.</p>
        <h2 className="text-xl font-semibold mt-4">2. How We Use Data</h2>
        <p>Your data is used solely to provide the SimpliOnboard service — authenticating your account, storing your forms, and processing client submissions.</p>
        <h2 className="text-xl font-semibold mt-4">3. Data Storage</h2>
        <p>Data is stored securely on Supabase servers. Payments are processed via Wise and we never see your full credit card details.</p>
        <h2 className="text-xl font-semibold mt-4">4. Contact</h2>
        <p>Questions: support@simplionboard.com</p>
      </div>
    </div>
  );
}
