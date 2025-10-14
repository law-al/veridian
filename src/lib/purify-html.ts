import sanitizeHtml from 'sanitize-html';

export const purifyHtml = (html: string): string => {
  const sanitized = sanitizeHtml(html, {
    allowedTags: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'code',
      'pre',

      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',

      'ul',
      'ol',
      'li',

      'blockquote',

      'img',

      'a',

      'hr',
      'div',
      'span',
    ],
    allowedAttributes: {
      '*': ['class', 'style'], // For text-align and other styling
      img: ['src', 'alt', 'title'],
      a: ['href', 'target', 'rel'],
    },
    allowedStyles: {
      '*': {
        'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      },
    },
  });
  return sanitized;
};
