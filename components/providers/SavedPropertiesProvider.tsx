"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface SavedPropertiesContextType {
  savedPropertyIds: string[];
  saveProperty: (propertyId: string) => Promise<void>;
  unsaveProperty: (propertyId: string) => Promise<void>;
  isLoading: boolean;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

export function SavedPropertiesProvider({ children }: { children: ReactNode }) {
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    
    // Escuchar el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setUser(session?.user || null);
        if (!session?.user) {
          setSavedPropertyIds([]);
          setIsLoading(false);
        }
      }
    });

    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user || null);
        if (!data.user) {
          setSavedPropertyIds([]);
          setIsLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  useEffect(() => {
    if (!user) return;

    const fetchSavedProperties = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("saved_properties")
        .select("property_id")
        .eq("user_id", user.id);

      if (!error && data) {
        setSavedPropertyIds(data.map(item => item.property_id));
      }
      setIsLoading(false);
    };

    fetchSavedProperties();
  }, [user, supabase]);

  const saveProperty = async (propertyId: string) => {
    if (!user) {
      router.push("/login");
      return; 
    }
    
    // Optimizamente
    setSavedPropertyIds(prev => {
      if (prev.includes(propertyId)) return prev;
      return [...prev, propertyId];
    });

    const { error } = await supabase
      .from("saved_properties")
      .insert({ user_id: user.id, property_id: propertyId });

    if (error) {
      // Revertir si hay error
      console.error(error);
      setSavedPropertyIds(prev => prev.filter(id => id !== propertyId));
    }
  };

  const unsaveProperty = async (propertyId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    
    // Optimizamente
    setSavedPropertyIds(prev => prev.filter(id => id !== propertyId));

    const { error } = await supabase
      .from("saved_properties")
      .delete()
      .match({ user_id: user.id, property_id: propertyId });

    if (error) {
      // Revertir si hay error
      console.error(error);
      setSavedPropertyIds(prev => [...prev, propertyId]);
    }
  };

  return (
    <SavedPropertiesContext.Provider value={{ savedPropertyIds, saveProperty, unsaveProperty, isLoading }}>
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (context === undefined) {
    throw new Error("useSavedProperties debe ser usado dentro de un SavedPropertiesProvider");
  }
  return context;
}
