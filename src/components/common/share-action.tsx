import { CopyMinus } from 'lucide-react';
import React from 'react';
import { TiSocialTwitter } from 'react-icons/ti';

export default function ShareAction() {
  return (
    <div className='flex items-center gap-1'>
      <p>Share: </p>
      <div className='flex items-center gap-2'>
        <TiSocialTwitter className='size-5' />
        <CopyMinus className='size-5' />
      </div>
    </div>
  );
}
