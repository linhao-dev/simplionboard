"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Copy, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface OnboardingForm {
  id: string;
  title: string;
  created_at: string;
  client_count: number;
}

export default function DashboardPage() {
  const [forms, setForms] = useState<OnboardingForm[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    const { data } = await supabase.from("onboarding_forms").select("*").order("created_at", { ascending: false });
    if (data) setForms(data as OnboardingForm[]);
    setLoading(false);
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/f/${id}`);
    toast.success("Link copied to clipboard");
  };

  const deleteForm = async (id: string) => {
    await supabase.from("onboarding_forms").delete().eq("id", id);
    setForms(forms.filter((f) => f.id !== id));
    toast.success("Form deleted");
  };

  if (loading) return <div className="animate-pulse space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-xl" />)}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Onboarding Forms</h1>
          <p className="text-gray-600 mt-1">Create branded intake forms for your clients</p>
        </div>
        <Link href="/dashboard/forms/new" className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
          <Plus size={18} /> New Form
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <h3 className="text-lg font-semibold mb-2">No forms yet</h3>
          <p className="text-gray-500 mb-6">Create your first client onboarding form in 5 minutes</p>
          <Link href="/dashboard/forms/new" className="rounded-xl bg-indigo-600 px-6 py-2.5 text-white font-medium hover:bg-indigo-500">Create your first form</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {forms.map((form) => (
            <div key={form.id} className="bg-white rounded-xl border p-5 flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="font-semibold">{form.title || "Untitled Form"}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Created {new Date(form.created_at).toLocaleDateString()} · {form.client_count || 0} clients onboarded
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => copyLink(form.id)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Copy link">
                  <Copy size={16} />
                </button>
                <Link href={`/f/${form.id}`} target="_blank" className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" title="Preview">
                  <ExternalLink size={16} />
                </Link>
                <button onClick={() => deleteForm(form.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
