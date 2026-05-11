"use client";
import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface FormData {
  id: string;
  title: string;
  description: string;
  logo_url: string;
  brand_color: string;
  contract_text: string;
  deposit_amount: number;
  fields: Array<{ id: string; label: string; type: string; required: boolean }>;
  user_id: string;
}

export default function ClientFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [signed, setSigned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("onboarding_forms").select("*").eq("id", id).single();
      if (data) setForm(data as FormData);
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form?.contract_text && !signed) { toast.error("Please sign the contract"); return; }
    setSubmitting(true);

    const { error } = await supabase.from("client_submissions").insert({
      form_id: id,
      user_id: form?.user_id,
      data: formValues,
      signed: !!signed,
    });

    if (error) { toast.error("Submission failed. Please try again."); setSubmitting(false); return; }

    // Increment client count
    await supabase.rpc("increment_client_count", { form_id: id });

    setSubmitted(true);
    setSubmitting(false);
    toast.success("Submitted successfully!");
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" /></div>;
  if (!form) return <div className="flex items-center justify-center min-h-screen text-gray-500">Form not found</div>;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4" style={{ backgroundColor: form.brand_color + "08" }}>
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-10 shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-2">Submitted!</h1>
          <p className="text-gray-600">Your information has been sent. You&apos;ll hear back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4" style={{ backgroundColor: form.brand_color + "08" }}>
      <div className="max-w-2xl mx-auto">
        {/* Brand header */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          <div className="p-8 text-center border-b" style={{ borderColor: form.brand_color + "20" }}>
            {form.logo_url && <img src={form.logo_url} alt="Logo" className="h-12 mx-auto mb-4" />}
            <h1 className="text-2xl font-bold" style={{ color: form.brand_color }}>{form.title}</h1>
            <p className="text-gray-600 mt-2">{form.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {form.fields?.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-1.5">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea required={field.required} value={formValues[field.id] || ""} onChange={(e) => setFormValues({ ...formValues, [field.id]: e.target.value })}
                    rows={4} className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:outline-none" style={{ "--tw-ring-color": form.brand_color } as React.CSSProperties} />
                ) : field.type === "file" ? (
                  <input type="file" required={field.required} className="w-full rounded-lg border px-4 py-2.5 text-sm" />
                ) : (
                  <input type={field.type} required={field.required} value={formValues[field.id] || ""} onChange={(e) => setFormValues({ ...formValues, [field.id]: e.target.value })}
                    className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:outline-none" style={{ "--tw-ring-color": form.brand_color } as React.CSSProperties} />
                )}
              </div>
            ))}

            {/* Contract */}
            {form.contract_text && (
              <div className="border rounded-xl p-4 bg-gray-50">
                <h3 className="font-semibold mb-3">Contract</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans mb-4 max-h-48 overflow-y-auto">{form.contract_text}</pre>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={signed} onChange={(e) => setSigned(e.target.checked)} className="rounded" />
                  I agree and sign electronically
                </label>
              </div>
            )}

            {/* Deposit */}
            {form.deposit_amount && (
              <div className="bg-indigo-50 rounded-xl p-4 text-center">
                <p className="text-sm text-indigo-600 mb-1">Deposit Required</p>
                <p className="text-2xl font-bold text-indigo-700">${(form.deposit_amount / 100).toFixed(0)}</p>
                <p className="text-xs text-indigo-400 mt-1">You will be redirected to secure payment after submission</p>
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full rounded-xl py-3 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: form.brand_color }}>
              {submitting ? "Submitting..." : form.deposit_amount ? "Submit & Pay Deposit" : "Submit"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">Powered by SimpliOnboard</p>
      </div>
    </div>
  );
}
