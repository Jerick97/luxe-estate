import React from 'react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  const [propertiesResult, usersResult] = await Promise.all([
    supabase
      .from('properties')
      .select('id, title, location, price, status, type')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('user_profiles')
      .select('id, email, role')
  ])

  const properties = propertiesResult.data || []
  const users = usersResult.data || []
  const adminsCount = users.filter(u => u.role === 'admin').length

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-nordic dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome to LuxeEstate Management.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/properties" className="bg-mosque hover:bg-mosque/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-mosque/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
            <span className="material-icons text-base">apartment</span> View Properties
          </Link>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#152e2a] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-mosque/20 flex flex-col justify-between hover:shadow-soft transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Properties</p>
              <h3 className="text-3xl font-bold text-nordic dark:text-white mt-2">{propertiesResult.count || properties.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-mosque/10 flex items-center justify-center">
              <span className="material-icons text-mosque text-2xl">holiday_village</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#152e2a] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-mosque/20 flex flex-col justify-between hover:shadow-soft transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
              <h3 className="text-3xl font-bold text-nordic dark:text-white mt-2">{users.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="material-icons text-blue-600 text-2xl">group</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#152e2a] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-mosque/20 flex flex-col justify-between hover:shadow-soft transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Admin Staff</p>
              <h3 className="text-3xl font-bold text-nordic dark:text-white mt-2">{adminsCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <span className="material-icons text-purple-600 text-2xl">admin_panel_settings</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#152e2a] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-mosque/20 flex flex-col justify-between hover:shadow-soft transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Activity</p>
              <h3 className="text-3xl font-bold text-nordic dark:text-white mt-2">+5</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <span className="material-icons text-orange-600 text-2xl">trending_up</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-mosque/20 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-mosque/20 flex justify-between items-center bg-gray-50/50 dark:bg-mosque/5">
            <h2 className="text-lg font-semibold text-nordic dark:text-white">Recent Properties</h2>
            <Link href="/admin/properties" className="text-sm text-mosque hover:underline font-medium">View All</Link>
          </div>
          <div className="flex-1 p-0 overflow-y-auto">
            {properties.length > 0 ? (
              <ul className="divide-y divide-gray-100 dark:divide-mosque/10">
                {properties.map((prop) => (
                  <li key={prop.id} className="p-4 sm:px-6 hover:bg-background-light dark:hover:bg-mosque/5 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="truncate">
                        <p className="text-sm font-medium text-mosque truncate">{prop.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{prop.location}</p>
                      </div>
                      <div className="flex items-center ml-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-active-green text-mosque">
                          ${prop.price?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">No properties found.</div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-mosque/20 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-mosque/20 flex justify-between items-center bg-gray-50/50 dark:bg-mosque/5">
            <h2 className="text-lg font-semibold text-nordic dark:text-white">Recent Users</h2>
            <Link href="/admin/users" className="text-sm text-mosque hover:underline font-medium">View All</Link>
          </div>
          <div className="flex-1 p-0 overflow-y-auto">
            {users.length > 0 ? (
              <ul className="divide-y divide-gray-100 dark:divide-mosque/10">
                {users.slice(0, 5).map((u) => (
                  <li key={u.id} className="p-4 sm:px-6 hover:bg-background-light dark:hover:bg-mosque/5 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-mosque/10 flex items-center justify-center text-mosque font-medium uppercase">
                          {u.email[0]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-nordic dark:text-white truncate">
                          {u.email}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                          {u.role || 'User'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">No users found.</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
