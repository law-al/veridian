import AuthorProfile from '@/components/features/author/author-profile';
import BlogContent from '@/components/features/blog/blog-content';
import BlogDetails from '@/components/features/blog/blog-details';
import BlogMeta from '@/components/features/blog/blog-meta';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { getAritcle, getUser } from '@/lib/data';
import PostActions from '@/components/features/posts/post-actions';
import AuthorDetails from '@/components/features/author/author-details';
import CommentsList from '@/components/features/comments/comments-list';

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
    },
    take: 20,
  });

  const ids = posts.map((post) => {
    return { slug: post.slug };
  });

  return ids;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, user] = await Promise.all([getAritcle(slug), getUser()]);

  if (!article) {
    notFound();
  }

  return (
    <section className='mt-10 w-[1200px] mx-auto'>
      <AuthorProfile
        image={article.author.image || ''}
        name={article.author.username || 'John Doe'}
        publishedAt={article.publishedAt}
      />
      <BlogDetails>
        <BlogMeta
          excerpt={article.excerpt}
          image={article.coverImage}
          title={article.title}
        />
        <BlogContent htmlContent={article.content} />
        <PostActions
          article={article}
          likesCount={article.likesCount}
          isLikedByUser={article.isLikedByUser}
          user={user}
        />
      </BlogDetails>
      <AuthorDetails author={article.author} user={user} />
      <CommentsList
        redirectParams={slug}
        author={article.author}
        user={user}
        comments={article.comments}
      />
    </section>
  );
}
