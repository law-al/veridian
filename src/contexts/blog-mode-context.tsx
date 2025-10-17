'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface BlogMode {
  mode: 'grid' | 'straight';
  handleSetMode: (val: 'grid' | 'straight') => void;
}

const BlogModeContext = createContext<BlogMode>({
  mode: 'grid',
  handleSetMode: (val: 'grid' | 'straight') => {},
});

export default function BlogModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<'grid' | 'straight'>('grid');

  const handleSetMode = (val: 'grid' | 'straight') => {
    setMode(val);
  };

  return (
    <BlogModeContext.Provider value={{ mode, handleSetMode }}>
      {children}
    </BlogModeContext.Provider>
  );
}

export function useBlogModeContext() {
  const context = useContext(BlogModeContext);

  if (!context)
    throw new Error(
      'useBlogModeContext must be used within a BlogModeProvider'
    );

  return context;
}
