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
      className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
    >
      <LogOut className="w-3.5 h-3.5" strokeWidth={2.25} />
      ログアウト
    </button>
  );
}
