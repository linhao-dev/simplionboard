"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const WISE_LINK = "https://wise.com/pay/r/I9-js8OjBJZbffo";

export default function UpgradePage() {
  const [user, setUser] = useState<any>(null);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        const created = new Date(data.user.created_at).getTime();
        const trialEnd = created + 7 * 86400000; // 7 day trial
        const daysLeft = Math.ceil((trialEnd - Date.now()) / 86400000);
        setTrialDaysLeft(Math.max(0, daysLeft));
        setPaid(data.user.user_metadata?.paid || false);
      }
    })();
  }, []);

  const handleMarkPaid = async () => {
    await supabase.auth.updateUser({ data: { paid: true } });
    setPaid(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">
          {paid ? "You're on Pro! 🎉" : `Trial: ${trialDaysLeft} days left`}
        </h1>

        {!paid && trialDaysLeft > 0 && (
          <div className="space-y-4 mt-6">
            <p className="text-gray-600">7-day free trial, then $19/month. Cancel anytime.</p>
            <a href={WISE_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-500">
              Pay $19 via Wise (Credit Card)
            </a>
            <p className="text-xs text-gray-400 mt-2">
              After payment, click the button below or refresh.
            </p>
            <button onClick={handleMarkPaid}
              className="text-sm text-indigo-600 hover:underline">
              I&apos;ve paid — activate my account
            </button>
          </div>
        )}

        {paid && (
          <div className="space-y-4 mt-6">
            <p className="text-green-600 font-medium">Pro access active</p>
            <Link href="/dashboard" className="block rounded-xl bg-black py-3 text-white font-semibold hover:bg-gray-800">Go to Dashboard</Link>
          </div>
        )}

        {!paid && trialDaysLeft === 0 && (
          <div className="space-y-4 mt-6">
            <p className="text-red-600 font-medium">Your free trial has ended</p>
            <a href={WISE_LINK} target="_blank" rel="noopener noreferrer"
              className="block w-full rounded-xl bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-500">
              Pay $19 to Continue
            </a>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <p className="text-xs text-gray-400">
            Powered by Wise for secure payments. Questions? <a href="mailto:support@simplionboard.com" className="text-indigo-600">Email us</a>
          </p>
        </div>
      </div>
    </div>
  );
}
