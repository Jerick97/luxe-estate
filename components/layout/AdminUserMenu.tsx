"use client";

import { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { useTranslation } from "@/components/providers/I18nProvider";

export const AdminUserMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 ml-1 lg:ml-2 relative" ref={userMenuRef}>
      <div className="flex-col items-end hidden sm:flex">
        <span className="text-sm font-semibold text-nordic dark:text-white">
          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Admin User'}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Administrator</span>
      </div>
      <button 
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className={`w-8 h-8 rounded-full overflow-hidden ring-2 transition-all ${isUserMenuOpen ? 'ring-mosque' : 'ring-transparent hover:ring-mosque'}`}>
          {user.user_metadata?.avatar_url ? (
            <Image 
              src={user.user_metadata.avatar_url} 
              alt="Admin avatar" 
              width={32} height={32}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-mosque/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-mosque text-lg">person</span>
            </div>
          )}
        </div>
      </button>

      {isUserMenuOpen && (
        <div className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-[#1a1f2e] border border-gray-100 dark:border-white/10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-1.5 overflow-hidden z-50 animate-in fade-in transition-all">
          <button
            onClick={async () => {
              setIsUserMenuOpen(false);
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors text-left group"
          >
            <LogOut className="w-4 h-4 text-rose-500/70 group-hover:text-rose-600 transition-colors" />
            <span className="font-medium">{t("navbar.signOut") || "Sign Out"}</span>
          </button>
        </div>
      )}
    </div>
  );
};
