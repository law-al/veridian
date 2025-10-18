import React from 'react';

export default function BlogContent({ htmlContent }: { htmlContent: string }) {
  return (
    <article
      className='mt-10 prose prose-lg max-w-none font-light prose-headings:tracking-tight prose-headings:text-gray-800 prose-h4:text-xl prose-p:leading-relaxed prose-p:my-4 prose-a:text-gray-700 hover:prose-a:text-gray-900 prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-gray-400 prose-strong:text-gray-900 prose-blockquote:border-l-4 prose-blockquote:border-gray-200 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-md prose-blockquote:text-gray-700 prose-blockquote:italic prose-code:bg-gray-100 prose-code:text-gray-700 prose-code:font-mono prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:font-light prose-pre:bg-gray-50 prose-pre:text-gray-700 prose-pre:rounded-lg prose-pre:p-4 prose-pre:shadow-sm prose-pre:border prose-pre:border-gray-200 prose-pre:font-light prose-li:marker:text-gray-400 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-li:text-gray-600 prose-li:font-light prose-img:rounded-lg prose-img:shadow-sm prose-img:my-6 prose-img:mx-auto prose-hr:border-gray-200 prose-hr:my-8 prose-table:border prose-table:border-gray-200 prose-th:bg-gray-100 prose-th:text-gray-700 prose-th:font-light prose-th:p-2 prose-td:p-2 prose-td:border-t prose-td:border-gray-200 prose-td:text-gray-600 prose-td:font-light selection:bg-gray-200 selection:text-gray-900 prose-slate
      prose-headings:font-bold
      prose-h1:text-5xl prose-h1:font-extrabold prose-h1:mb-6
      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-lg prose-p:text-gray-700 prose-p:mb-6
      prose-strong:font-semibold
'
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
