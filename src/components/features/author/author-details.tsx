'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Prisma } from '@/generated/prisma';
import { Button } from '../../ui/button';
import Image from 'next/image';

const AuthorDetails = ({
  author,
  user,
}: {
  author: Prisma.UserGetPayload<{}>;
  user: Prisma.UserGetPayload<{}> | null;
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  return (
    <div className='w-full max-w-2xl my-6 mx-auto rounded-lg p-6'>
      <div className='flex items-start gap-4'>
        {/* Avatar */}
        <div className='flex-shrink-0'>
          <Image
            src={author.image || '/default-avatar.png'}
            alt={author.username || 'Author'}
            width={64}
            height={64}
            className='rounded-full object-cover w-16 h-16'
          />
        </div>

        {/* Content */}
        <div className='flex-1'>
          {/* Header */}
          <div className='mb-2'>
            <p className='text-xs text-gray-500 uppercase tracking-wide mb-1'>
              Written by
            </p>
            <h3 className='text-xl font-bold text-gray-900'>
              {author.username}
            </h3>
          </div>

          {/* Bio */}
          <p className='text-gray-600 text-sm leading-relaxed mb-4'>
            {'Author and content creator'}
          </p>

          {/* Follow Button */}
          {user && user?.clerkId !== author.clerkId && (
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isFollowing
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthorDetails;
