import Image from "next/image";
import { Heart, BedDouble, Bath, Maximize } from "lucide-react";
import { Property } from "@/lib/types";

interface Props {
  property: Property;
  className?: string;
}

export const PropertyCard = ({ property, className = "" }: Props) => {
  return (
    <article className={`bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col ${className}`}>
      <div className="relative aspect-4/3 overflow-hidden">
        <Image 
          src={property.imageUrl} 
          alt={property.imageAlt} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/50 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic-dark z-10">
          <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>
        <div className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded z-10 ${property.status === 'FOR RENT' ? 'bg-mosque/90' : 'bg-nordic-dark/90'}`}>
          {property.status}
        </div>
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic-dark dark:text-white">
            {property.price >= 1000 ? `$${property.price.toLocaleString()}` : `$${property.price}`}
            {property.period && <span className="text-sm font-normal text-nordic-muted">{property.period}</span>}
          </h3>
        </div>
        <h4 className="text-nordic-dark dark:text-gray-200 font-medium truncate mb-1">{property.title}</h4>
        <p className="text-nordic-muted text-xs mb-4">{property.location}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <BedDouble className="w-3.5 h-3.5 text-mosque/80" strokeWidth={1.5} /> {property.beds}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <Bath className="w-3.5 h-3.5 text-mosque/80" strokeWidth={1.5} /> {property.baths}
          </div>
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <Maximize className="w-3.5 h-3.5 text-mosque/80" strokeWidth={1.5} /> {property.area}m²
          </div>
        </div>
      </div>
    </article>
  );
};
