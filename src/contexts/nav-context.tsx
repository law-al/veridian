'use client';

import React, { createContext, useContext, useState } from 'react';

const NavContext = createContext({
  openSearch: false,
  handleOpenSearch: (value?: boolean) => {},
});

export default function NavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const handleOpenSearch = (value?: boolean) => {
    if (value) {
      setOpenSearch(value);
    } else {
      setOpenSearch((prev) => !prev);
    }
  };
  return (
    <NavContext.Provider value={{ openSearch, handleOpenSearch }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNavContext = () => {
  const context = useContext(NavContext);
  if (!context)
    throw new Error('useNavContext must be used within a NavProvider');

  return context;
};
