import { Building, Search, Bell, User } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-nordic-dark/10 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-nordic-dark flex items-center justify-center">
              <Building className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-nordic-dark dark:text-white">
              LuxuEstate
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="relative group text-mosque font-medium text-sm px-1 py-1">
              Buy
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-mosque rounded-full"></span>
            </Link>
            <Link href="#" className="relative group text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm px-1 py-1 transition-colors">
              Rent
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-mosque/50 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="#" className="relative group text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm px-1 py-1 transition-colors">
              Sell
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-mosque/50 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>
            <Link href="#" className="relative group text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm px-1 py-1 transition-colors">
              Saved Homes
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-mosque/50 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-nordic-dark hover:text-mosque dark:text-gray-400 dark:hover:text-white transition-colors">
              <Search className="h-6 w-6" strokeWidth={1.5} />
            </button>
            <button className="text-nordic-dark hover:text-mosque dark:text-gray-400 dark:hover:text-white transition-colors relative">
              <Bell className="h-7 w-7 text-nordic-dark" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
            </button>
            <button className="flex items-center gap-2 pl-2 border-l border-nordic-dark/10 dark:border-white/10 ml-2">
              <div className="w-9 h-9 rounded-full bg-[#EAC9B6] flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all relative">
                {/* Avatar SVG */}
                <User className="h-[18px] w-[18px] text-[#A67E67]" strokeWidth={2.5} />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden border-t border-nordic-dark/5 bg-background-light dark:bg-background-dark overflow-hidden h-0 transition-all duration-300">
        <div className="px-4 py-2 space-y-1">
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-mosque bg-mosque/10">Buy</Link>
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-nordic-dark hover:bg-black/5">Rent</Link>
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-nordic-dark hover:bg-black/5">Sell</Link>
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-nordic-dark hover:bg-black/5">Saved Homes</Link>
        </div>
      </div>
    </nav>
  );
};
