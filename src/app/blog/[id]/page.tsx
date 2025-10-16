import AuthorProfile from '@/components/author-profile';
import BlogContent from '@/components/ui/blog-content';
import BlogDetails from '@/components/ui/blog-details';
import BlogMeta from '@/components/ui/blog-meta';

export default function Page() {
  return (
    <section className='mt-10 w-[1200px] mx-auto'>
      <AuthorProfile />
      <BlogDetails>
        <BlogMeta />
        <BlogContent />
      </BlogDetails>
    </section>
  );
}
