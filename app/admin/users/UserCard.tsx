'use client';

import React, { useState, useRef, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { updateUserRole } from './actions';

interface UserCardProps {
  user: {
    id: string;
    email: string;
    role: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

export function UserCard({ user }: UserCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = user.role === 'admin';
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.email || 'User')}&background=0D8B7A&color=fff`;
  const avatar = user.avatar_url || fallbackAvatar;

  const handleRoleChange = (newRole: 'admin' | 'user') => {
    setIsOpen(false);
    if (newRole === user.role) return;
    
    startTransition(async () => {
      await updateUserRole(user.id, newRole);
    });
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`user-card relative rounded-xl p-5 shadow-sm border hover:shadow-soft flex flex-col md:grid md:grid-cols-12 gap-4 items-center transition-colors
      ${isAdmin ? 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:bg-active-green dark:hover:bg-mosque/20'}
      ${isOpen ? 'z-50' : 'z-10'}
    `}>
      <div className="col-span-12 md:col-span-4 flex items-center w-full">
        <div className="relative flex-shrink-0">
          <Image 
            width={48} height={48}
            alt={`Portrait of ${user.full_name || 'User'}`} 
            className="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
            src={avatar}
          />
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
        </div>
        <div className="ml-4 overflow-hidden">
          <div className="text-sm font-bold text-nordic dark:text-white truncate">{user.full_name || 'No Name'}</div>
          <div className="text-xs text-nordic/70 dark:text-gray-400 truncate">{user.email}</div>
          <div className="mt-1 text-[10px] px-2 py-0.5 inline-block bg-gray-50 dark:bg-white/10 rounded text-nordic/50 dark:text-gray-400 transition-colors">
            ID: #USR-{user.id.substring(0, 4).toUpperCase()}
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-3 w-full flex items-center justify-between md:justify-start gap-4">
        {isAdmin ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-nordic text-white shadow-sm">
            Administrator
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            User
          </span>
        )}
        <div className="flex items-center text-xs text-nordic/60 dark:text-gray-400">
          <span className="material-icons text-[14px] mr-1 text-mosque">check_circle</span> Active
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-3 w-full grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-nordic/40">Properties</div>
          <div className="text-sm font-semibold text-nordic dark:text-white">{isAdmin ? '-' : '0'}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-nordic/40">{isAdmin ? 'Access Level' : 'Sales (YTD)'}</div>
          <div className="text-sm font-semibold text-nordic dark:text-white">{isAdmin ? 'Level 5' : '$0'}</div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-2 w-full flex justify-end relative" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className={`inline-flex items-center px-4 py-2 text-xs font-medium rounded-lg focus:outline-none transition-colors w-full md:w-auto justify-center 
          ${isPending ? 'opacity-70 cursor-wait ' : ''}
          ${isAdmin 
            ? 'bg-mosque text-white shadow-md hover:bg-mosque/90' 
            : 'border border-gray-200 dark:border-gray-600 bg-transparent text-nordic/70 dark:text-gray-300 hover:border-nordic hover:text-nordic dark:hover:text-white dark:hover:border-gray-400 hover:bg-white hover:shadow-sm'
          }`
        }>
          {isPending ? 'Updating...' : 'Change Role'} <span className="material-icons text-[16px] ml-2">{isOpen ? 'expand_less' : 'expand_more'}</span>
        </button>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-dropdown bg-mosque ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-[100] origin-top-right transition-all">
            <div aria-labelledby="options-menu" aria-orientation="vertical" className="py-1" role="menu">
              <button onClick={() => handleRoleChange('admin')} className="w-full text-left group flex items-center px-4 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" role="menuitem">
                <span className={`material-icons text-sm mr-3 ${isAdmin ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>shield</span> Administrator
              </button>
              <button onClick={() => handleRoleChange('user')} className="w-full text-left group flex items-center px-4 py-3 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer" role="menuitem">
                <span className={`material-icons text-sm mr-3 ${!isAdmin ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>person</span> User
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
