import React, { ReactNode } from 'react';

export default function BlogDetails({ children }: { children: ReactNode }) {
  return <div className='mt-10'>{children}</div>;
}
