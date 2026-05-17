'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/components/providers/I18nProvider';

export function AdminNavLinks() {
  const pathname = usePathname();
  const { t } = useTranslation();
  
  const links = [
    { name: t('admin.nav.dashboard'), href: '/admin', exact: true },
    { name: t('admin.nav.listings'), href: '/admin/properties', exact: false },
    { name: t('admin.nav.users'), href: '/admin/users', exact: false },
  ];
  
  return (
    <>
      {links.map((link) => {
        const isActive = link.exact 
          ? pathname === link.href 
          : pathname.startsWith(link.href);
          
        return (
          <Link 
            key={link.name}
            href={link.href} 
            className={`px-1 py-2 text-sm font-medium transition-colors ${
              isActive 
                ? 'text-mosque dark:text-mosque border-b-2 border-mosque' 
                : 'text-nordic/60 dark:text-gray-400 hover:text-mosque dark:hover:text-mosque'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
