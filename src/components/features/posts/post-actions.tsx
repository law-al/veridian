import React from 'react';
import LikeButton from '../../shared/buttons/like';
import CommentButton from '../comments/comments-button';
import ShareAction from '../../common/share-action';
import BookmarkButton from '../../shared/buttons/bookmark';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { Prisma } from '@/generated/prisma';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function PostActions({
  article,
  user,
  likesCount,
  isLikedByUser,
}: {
  article: Prisma.PostGetPayload<{ include: { author: true; comments: true } }>;
  user: Prisma.UserGetPayload<{}> | null;
  likesCount: number;
  isLikedByUser: boolean;
}) {
  return (
    <div className=''>
      {user ? (
        user.clerkId !== article.author.clerkId && (
          <div className='mt-10 border-y-2 border-gray-200 py-5 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <LikeButton
                postId={article.id}
                slug={article.slug}
                likesCount={likesCount}
                initialLiked={isLikedByUser}
              />
              <CommentButton commentsCount={article.comments.length} />
              <BookmarkButton />
            </div>
            <div className=''>
              <ShareAction />
            </div>
          </div>
        )
      ) : (
        <div className='mt-10 border-y-2 border-gray-200 py-5'>
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Like what you see?
            </h3>
            <p className='text-gray-600 mb-4'>
              Sign in to like, comment, bookmark, and share articles
            </p>
            <div className='flex gap-3 justify-center items-center flex-wrap'>
              <SignInButton
                mode='modal'
                fallbackRedirectUrl={`/articles/${article.slug}`}
                signUpFallbackRedirectUrl={`/articles/${article.slug}`}
              >
                <Button className='px-6 h-12 py-2.5 bg-transparent border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300'>
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton
                mode='modal'
                fallbackRedirectUrl={`/articles/${article.slug}`}
                signInFallbackRedirectUrl={`/articles/${article.slug}`}
              >
                <Button className='px-6 py-2.5 h-12 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all duration-200'>
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
