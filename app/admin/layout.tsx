import Link from 'next/link'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { cookies } from 'next/headers'
import { AdminUserMenu } from '@/components/layout/AdminUserMenu'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'
  const t = await getDictionary(lang as "en" | "es" | "fr")

  return (
    <div className="bg-background-light dark:bg-background-dark text-nordic dark:text-gray-100 font-display min-h-screen flex flex-col antialiased">
      <nav className="bg-card-white dark:bg-[#152e2a] border-b border-nordic/5 dark:border-mosque/20 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/admin" className="flex-shrink-0 flex items-center gap-2">
              <span className="material-symbols-outlined text-mosque text-2xl">apartment</span>
              <span className="font-bold text-lg text-nordic dark:text-white tracking-tight">LuxeEstate</span>
            </Link>
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              <Link href="/admin" className="text-nordic/60 dark:text-gray-400 hover:text-mosque dark:hover:text-mosque px-1 py-2 text-sm font-medium transition-colors">Dashboard</Link>
              <Link href="/admin/properties" className="text-nordic/60 dark:text-gray-400 hover:text-mosque dark:hover:text-mosque px-1 py-2 text-sm font-medium transition-colors">Listings</Link>
              <Link href="/admin/users" className="text-nordic/60 dark:text-gray-400 hover:text-mosque dark:hover:text-mosque px-1 py-2 text-sm font-medium transition-colors">Users</Link>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
            <button className="text-nordic/60 dark:text-gray-400 hover:text-mosque transition-colors">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            <button className="text-nordic/60 dark:text-gray-400 hover:text-mosque transition-colors relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#152e2a]"></span>
            </button>
            <AdminUserMenu />
          </div>
        </div>
      </nav>
      {children}
      <footer className="mt-auto border-t border-nordic/5 dark:border-mosque/20 bg-background-light dark:bg-[#152e2a] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="text-center text-sm text-gray-400 dark:text-gray-500">© 2026 LuxeEstate Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
