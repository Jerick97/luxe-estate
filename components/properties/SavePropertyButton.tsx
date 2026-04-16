"use client";

import { useSavedProperties } from "@/components/providers/SavedPropertiesProvider";
import { Heart } from "lucide-react";

export function SavePropertyButton({ propertyId }: { propertyId: string }) {
  const { savedPropertyIds, saveProperty, unsaveProperty } = useSavedProperties();

  const isSaved = savedPropertyIds.includes(propertyId);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop Link propagation
    e.stopPropagation();

    if (isSaved) {
      unsaveProperty(propertyId);
    } else {
      saveProperty(propertyId);
    }
  };

  return (
    <button
      onClick={toggleSave}
      aria-label={isSaved ? "Unsave property" : "Save property"}
      className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 z-20 group/btn shadow-sm backdrop-blur-sm ${
        isSaved 
          ? "bg-white dark:bg-black/80 border border-transparent shadow-md" 
          : "bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80"
      }`}
    >
      <Heart
        className={`w-[18px] h-[18px] transition-colors duration-200 ${
          isSaved 
            ? "fill-rose-500 text-rose-500" 
            : "text-nordic-dark/70 dark:text-gray-300 group-hover/btn:text-rose-500"
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}
