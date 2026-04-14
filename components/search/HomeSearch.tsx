"use client";

import { useState } from "react";
import { Search, Settings2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchFiltersModal } from "./SearchFiltersModal";
import { useTranslation } from "@/components/providers/I18nProvider";

const PROPERTY_TYPES = ["All", "House", "Apartment", "Villa", "Penthouse", "Condo", "Townhouse"];

export function HomeSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeType = searchParams.get("type") || "All";

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const setType = (type: string) => {
    const params = new URLSearchParams(searchParams);
    if (type === "All" || type === "Any Type") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="relative group max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-nordic-muted text-2xl group-focus-within:text-mosque transition-colors h-6 w-6" strokeWidth={1.5} />
        </div>
        <input 
          className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white dark:bg-white/5 text-nordic-dark dark:text-white shadow-soft placeholder-nordic-muted/60 focus:ring-2 focus:ring-mosque focus:bg-white dark:focus:bg-white/10 transition-all text-lg outline-none" 
          placeholder={t("search.placeholder")} 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20"
        >
          {t("search.button")}
        </button>
      </div>
      
      <div className="flex items-center justify-center gap-3 flex-wrap py-2 mt-5">
        {PROPERTY_TYPES.map((type) => (
          <button 
            key={type}
            onClick={() => setType(type)}
            className={`whitespace-nowrap flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-transform hover:-translate-y-0.5 ${
              activeType === type 
                ? "bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10" 
                : "bg-white dark:bg-white/5 border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5"
            }`}
          >
            {t(`search.types.${type}`)}
          </button>
        ))}
        <div className="w-px h-6 bg-nordic-dark/10 mx-2 flex-shrink-0"></div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="whitespace-nowrap flex-shrink-0 flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          <Settings2 className="h-4 w-4" strokeWidth={2} /> {t("search.filters")}
        </button>
      </div>

      <SearchFiltersModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
