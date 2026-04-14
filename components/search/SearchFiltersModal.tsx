"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, MapPin, ChevronDown, Minus, Plus, Waves, Dumbbell, Car, Wind, Wifi, Sun, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMENITIES = [
  { id: "Swimming Pool", label: "Swimming Pool", icon: Waves },
  { id: "Gym", label: "Gym", icon: Dumbbell },
  { id: "Parking", label: "Parking", icon: Car },
  { id: "Air Conditioning", label: "Air Conditioning", icon: Wind },
  { id: "High-speed Wifi", label: "High-speed Wifi", icon: Wifi },
  { id: "Patio / Terrace", label: "Patio / Terrace", icon: Sun },
];

export function SearchFiltersModal({ isOpen, onClose }: SearchFiltersModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("query") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [type, setType] = useState(searchParams.get("type") || "Any Type");
  const [beds, setBeds] = useState(parseInt(searchParams.get("beds") || "0"));
  const [baths, setBaths] = useState(parseInt(searchParams.get("baths") || "0"));
  
  const initialAmenities = searchParams.get("amenities") 
    ? searchParams.get("amenities")!.split(",") 
    : [];
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialAmenities);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleClear = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setType("Any Type");
    setBeds(0);
    setBaths(0);
    setSelectedAmenities([]);
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    
    if (location) params.set("query", location);
    else params.delete("query");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    if (type !== "Any Type") params.set("type", type);
    else params.delete("type");

    if (beds > 0) params.set("beds", beds.toString());
    else params.delete("beds");

    if (baths > 0) params.set("baths", baths.toString());
    else params.delete("baths");

    if (selectedAmenities.length > 0) params.set("amenities", selectedAmenities.join(","));
    else params.delete("amenities");

    // Reset pagination to page 1 on new search
    params.set("page", "1");

    router.push(`/?${params.toString()}`, { scroll: false });
    onClose();
  };

  return createPortal(
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Main Modal Container */}
      <div className="fixed inset-x-4 inset-y-10 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-50 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:h-auto max-h-[90vh]">
        
        {/* Header */}
        <header className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-30">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Filters</h1>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-10">
          
          {/* Section 1: Location */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Location
            </label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-mosque transition-colors w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-mosque focus:bg-white dark:focus:bg-gray-800 transition-all shadow-sm outline-none" 
                placeholder="City, neighborhood, or address" 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </section>

          {/* Section 2: Price Range */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price Range</label>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">Min Price</label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input 
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm outline-none" 
                    type="number" 
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">Max Price</label>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-1">$</span>
                  <input 
                    className="w-full bg-transparent border-0 p-0 text-gray-900 dark:text-white font-medium focus:ring-0 text-sm outline-none" 
                    type="number" 
                    placeholder="Any"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Property Type */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Property Type</label>
              <div className="relative">
                <select 
                  className="w-full bg-gray-50 dark:bg-gray-800 border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 dark:text-white appearance-none focus:ring-2 focus:ring-mosque cursor-pointer outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Any Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Studio</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
              {/* Beds */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Bedrooms</span>
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-full p-1">
                  <button 
                    onClick={() => setBeds(Math.max(0, beds - 1))}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{beds > 0 ? beds + '+' : 'Any'}</span>
                  <button 
                    onClick={() => setBeds(beds + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Baths */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Bathrooms</span>
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-full p-1">
                  <button 
                    onClick={() => setBaths(Math.max(0, baths - 1))}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{baths > 0 ? baths + '+' : 'Any'}</span>
                  <button 
                    onClick={() => setBaths(baths + 1)}
                    className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque disabled:opacity-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Amenities */}
          <section>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Amenities & Features
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AMENITIES.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`relative px-4 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                      isSelected 
                        ? 'border-mosque bg-mosque/5 text-mosque dark:bg-mosque/20 dark:text-white' 
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-mosque' : 'text-gray-400'}`} />
                    {amenity.label}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-mosque rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-4 sticky bottom-0 z-30 flex items-center justify-between">
          <button 
            onClick={handleClear}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors underline decoration-transparent hover:decoration-gray-300 underline-offset-4"
          >
            Clear all
          </button>
          <button 
            onClick={handleApply}
            className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95"
          >
            Apply Filters
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </footer>
      </div>
    </>,
    document.body
  );
}
