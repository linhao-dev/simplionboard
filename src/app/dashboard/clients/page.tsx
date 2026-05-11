"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Calendar, FileText } from "lucide-react";

interface Submission { id: string; form_id: string; data: Record<string, string>; signed: boolean; created_at: string;
  onboarding_forms?: { title: string } | null; }

export default function ClientsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("client_submissions").select("*, onboarding_forms(title)").order("created_at", { ascending: false })
      .then(({ data }) => { setSubmissions((data || []) as Submission[]); setLoading(false); });
  }, []);

  if (loading) return <div className="animate-pulse space-y-4">{[1,2].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl" />)}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Clients</h1>
      <p className="text-gray-600 mb-8">All client submissions across your forms</p>

      {submissions.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <User size={40} className="mx-auto text-gray-300 mb-3" />
          <h3 className="font-semibold mb-1">No clients yet</h3>
          <p className="text-gray-500 text-sm">Share your onboarding form link to start receiving client submissions</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b bg-gray-50 text-left text-sm text-gray-500">
              <th className="px-6 py-3 font-medium">Client</th><th className="px-6 py-3 font-medium">Form</th><th className="px-6 py-3 font-medium">Signed</th><th className="px-6 py-3 font-medium">Date</th>
            </tr></thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center"><User size={14} className="text-indigo-600" /></div>
                      <div>
                        <p className="text-sm font-medium">{s.data?.[Object.keys(s.data)[0]] || "Client"}</p>
                        <p className="text-xs text-gray-400">{s.data?.Email || s.data?.email || ""}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{s.onboarding_forms?.title || "—"}</td>
                  <td className="px-6 py-4">{s.signed ? <span className="text-green-600 text-sm">✓ Signed</span> : <span className="text-gray-400 text-sm">—</span>}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
