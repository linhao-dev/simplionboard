"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Plus, X, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "file" | "number";
  required: boolean;
}

export default function NewFormPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Client Onboarding Form");
  const [description, setDescription] = useState("Please fill out the information below to get started.");
  const [logoUrl, setLogoUrl] = useState("");
  const [color, setColor] = useState("#4F46E5");
  const [contractText, setContractText] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", label: "Full Name", type: "text", required: true },
    { id: "2", label: "Email", type: "text", required: true },
    { id: "3", label: "Project Description", type: "textarea", required: true },
    { id: "4", label: "Budget Range", type: "text", required: false },
  ]);
  const [saving, setSaving] = useState(false);

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), label: "", type: "text", required: false }]);
  };

  const removeField = (id: string) => setFields(fields.filter((f) => f.id !== id));

  const updateField = (id: string, key: keyof FormField, value: string | boolean) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user?.id;
    if (!userId) { toast.error("Please log in first"); return; }

    const { data, error } = await supabase.from("onboarding_forms").insert({
      user_id: userId,
      title,
      description,
      logo_url: logoUrl,
      brand_color: color,
      contract_text: contractText,
      deposit_amount: depositAmount ? parseInt(depositAmount) * 100 : null,
      fields: fields,
    }).select("id").single();

    if (error) { toast.error("Failed to save: " + error.message); setSaving(false); return; }

    toast.success("Form created!");
    router.push(`/dashboard`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard" className="text-gray-400 hover:text-gray-600"><ArrowLeft size={20} /></Link>
        <h1 className="text-2xl font-bold">Create Onboarding Form</h1>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold">Form Settings</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Form Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description / Welcome Message</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Logo URL (optional)</label>
              <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://yoursite.com/logo.png" className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand Color</label>
              <div className="flex gap-2">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded border cursor-pointer" />
                <input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Form fields */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Form Fields</h2>
            <button onClick={addField} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"><Plus size={16} /> Add Field</button>
          </div>
          {fields.map((field, i) => (
            <div key={field.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-400 w-6">{i + 1}.</span>
              <input value={field.label} onChange={(e) => updateField(field.id, "label", e.target.value)} placeholder="Field label" className="flex-1 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
              <select value={field.type} onChange={(e) => updateField(field.id, "type", e.target.value)} className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option value="text">Text</option><option value="textarea">Long Text</option><option value="number">Number</option><option value="file">File Upload</option>
              </select>
              <label className="flex items-center gap-1 text-sm text-gray-500">
                <input type="checkbox" checked={field.required} onChange={(e) => updateField(field.id, "required", e.target.checked)} className="rounded" /> Required
              </label>
              <button onClick={() => removeField(field.id)} className="text-gray-400 hover:text-red-500"><X size={16} /></button>
            </div>
          ))}
        </div>

        {/* Contract */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold">Contract (Optional)</h2>
          <textarea value={contractText} onChange={(e) => setContractText(e.target.value)} rows={5} placeholder="Paste your contract template here. Clients will e-sign before submitting." className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold">Deposit (Optional)</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Deposit Amount (USD)</label>
            <div className="relative w-48">
              <span className="absolute left-3 top-2.5 text-gray-400">$</span>
              <input value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} type="number" placeholder="500" className="w-full rounded-lg border pl-7 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Client will be prompted to pay this deposit before submitting</p>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500 disabled:opacity-50">
          <Save size={18} /> {saving ? "Saving..." : "Save Form"}
        </button>
      </div>
    </div>
  );
}
