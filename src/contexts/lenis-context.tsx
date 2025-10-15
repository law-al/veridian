'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { PropsWithChildren, ReactNode } from 'react';

export default function LenisProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        lerp: 0.08,
        smoothWheel: true,
        touchMultiplier: 1.5,
      }}
    >
      <>{children}</>
    </ReactLenis>
  );
}
