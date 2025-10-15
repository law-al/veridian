'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { poppins } from '../../lib/fonts';

export default function NavLink({
  href = '/',
  navName,
  className,
}: {
  href?: string;
  navName: string;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        `text-lg text-charcoal mb-1 hover:text-charcoal capitalize border-b-2 border-transparent ${poppins.className}`,
        className,
        pathname === href && 'text-dark-charcoal border-b-2 border-current'
      )}
    >
      {navName}
    </Link>
  );
}
