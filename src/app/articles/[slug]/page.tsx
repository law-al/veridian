import AuthorProfile from '@/components/author-profile';
import BlogContent from '@/components/blog-content';
import BlogDetails from '@/components/blog-details';
import BlogMeta from '@/components/blog-meta';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

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

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findFirst({
    where: { slug: params.slug },
  });

  if (!post) {
    notFound();
  }

  return (
    <section className='mt-10 w-[1200px] mx-auto'>
      <AuthorProfile />
      <BlogDetails>
        <BlogMeta
          excerpt={post.excerpt}
          image={post.coverImage}
          title={post.title}
        />
        <BlogContent htmlContent={post.content} />
      </BlogDetails>
    </section>
  );
}
