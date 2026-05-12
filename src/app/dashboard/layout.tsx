"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login");
      else setSession(data.session);
    }).catch(() => {
      router.push("/login");
    });
  }, [router]);

  if (session === undefined) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" /></div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="text-lg font-bold">SimpliOnboard</Link>
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Forms</Link>
            <Link href="/dashboard/clients" className="text-sm text-gray-600 hover:text-gray-900">Clients</Link>
          </div>
          <button onClick={() => { supabase.auth.signOut(); router.push("/"); }}
            className="text-sm text-gray-500 hover:text-gray-700">Log out</button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
