import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { UserCard } from './UserCard';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ role?: string }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentRole = params.role || 'all';
  
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  let userQuery = supabase
    .from('user_profiles')
    .select('*')
    .order('role', { ascending: true }) // Put admins first since "admin" < "user" alphabetically
    .order('full_name', { ascending: true });

  if (currentRole === 'admin') {
    userQuery = userQuery.eq('role', 'admin');
  } else if (currentRole === 'user') {
    userQuery = userQuery.eq('role', 'user');
  }

  const { data: users, error } = await userQuery;

  return (
    <>
      <header className="w-full pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-nordic dark:text-white">User Directory</h1>
            <p className="text-nordic/60 dark:text-gray-400 mt-1 text-sm">Manage user access and roles for your properties.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-nordic/40 group-focus-within:text-mosque text-xl">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg bg-white dark:bg-gray-800 text-nordic dark:text-white shadow-soft placeholder-nordic/30 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-sm" placeholder="Search by name, email..." type="text"/>
            </div>
            <button className="inline-flex items-center justify-center px-4 py-2.5 border border-mosque text-sm font-medium rounded-lg text-mosque bg-transparent hover:bg-mosque/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mosque transition-colors whitespace-nowrap">
              <span className="material-icons text-lg mr-2">add</span> Add User
            </button>
          </div>
        </div>
        <div className="mt-8 flex gap-6 border-b border-nordic/10 overflow-x-auto hide-scroll">
          <Link href="/admin/users" className={`pb-3 text-sm transition-colors ${currentRole === 'all' ? 'font-semibold text-mosque border-b-2 border-mosque' : 'font-medium text-nordic/60 hover:text-nordic'}`}>All Users</Link>
          <Link href="/admin/users?role=user" className={`pb-3 text-sm transition-colors ${currentRole === 'user' ? 'font-semibold text-mosque border-b-2 border-mosque' : 'font-medium text-nordic/60 hover:text-nordic'}`}>Users</Link>
          <Link href="/admin/users?role=admin" className={`pb-3 text-sm transition-colors ${currentRole === 'admin' ? 'font-semibold text-mosque border-b-2 border-mosque' : 'font-medium text-nordic/60 hover:text-nordic'}`}>Admins</Link>
        </div>
      </header>
      
      <main className="flex-grow px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12 space-y-4">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-nordic/50 mb-2">
          <div className="col-span-4">User Details</div>
          <div className="col-span-3">Role &amp; Status</div>
          <div className="col-span-3">Performance</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {(!users || users.length === 0) ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            No users found in the database.
          </div>
        ) : (
          users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))
        )}
      </main>
    </>
  );
}
