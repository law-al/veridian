'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { SignInButton } from '@clerk/nextjs';
import { Prisma } from '@/generated/prisma';

const CommentsList = ({
  author,
  user,
  comments,
  redirectParams,
}: {
  redirectParams: string;
  author: Prisma.UserGetPayload<{}>;
  user: Prisma.UserGetPayload<{}> | null;
  comments: Prisma.CommentGetPayload<{}>[];
}) => {
  const [comment, setComment] = useState('');

  return (
    <div className='w-full max-w-3xl mx-auto p-6'>
      {/* Header */}
      <h2 className='text-2xl font-bold text-gray-900 mb-6'>
        Comments ({comments.length})
      </h2>

      {/* Comment Input */}
      {user ? (
        user.clerkId !== author.clerkId && (
          <div className='mb-8'>
            <div className='flex gap-3'>
              {/* Avatar */}
              <div className='flex-shrink-0'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center'>
                  <User className='w-6 h-6 text-amber-700' />
                </div>
              </div>

              {/* Input Area */}
              <div className='flex-1'>
                <textarea
                  id='commentBlock'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Add your comment...'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  rows={4}
                />
                <div className='flex justify-end mt-3'>
                  <button
                    // onClick={handlePostComment}
                    disabled={!comment.trim()}
                    className='px-6 py-2.5 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500'
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className='mb-8 border border-gray-300 rounded-lg p-6 text-center'>
          <p className='text-gray-600 mb-4'>You must be logged in to comment</p>
          <SignInButton
            mode='modal'
            fallbackRedirectUrl={`/articles/${redirectParams}`}
            signUpFallbackRedirectUrl={`/articles/${redirectParams}`}
          >
            <Button className='px-6 h-12 py-2.5 bg-transparent border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300'>
              Sign In
            </Button>
          </SignInButton>
        </div>
      )}

      {/* Comments List */}
      <div className='space-y-6'>
        {comments.map((commentItem) => (
          <div key={commentItem.id} className='flex gap-3'>
            {/* Avatar */}
            <div className='flex-shrink-0'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center'>
                <User className='w-6 h-6 text-gray-600' />
              </div>
            </div>

            {/* Comment Content */}
            <div className='flex-1 bg-gray-50 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='font-semibold text-gray-900'>
                  {/* {commentItem.} */}
                </span>
                <span className='text-sm text-gray-500'>
                  {/* • {commentItem.} */}
                </span>
              </div>
              <p className='text-gray-700 leading-relaxed'>
                {commentItem.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
