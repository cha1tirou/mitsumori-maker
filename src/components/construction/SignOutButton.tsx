"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/construction");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      aria-label="ログアウト"
      className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
    >
      <LogOut className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
      <span className="hidden sm:inline">ログアウト</span>
    </button>
  );
}
