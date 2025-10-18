import Footer from '@/components/footer';
import NavBar from '@/components/nav/nav-bar';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
