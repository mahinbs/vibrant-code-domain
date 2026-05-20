import content from './forLlmContent.json';
import { BRAND, organizationJsonLd } from './brand';

export type ForLlmContent = typeof content;

export const FOR_LLM_CONTENT = content;

export const FOR_LLM_CANONICAL = `${BRAND.siteUrl}${content.meta.canonicalPath}`;

export const forLlmFaqJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const forLlmWebPageJsonLd = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${FOR_LLM_CANONICAL}#webpage`,
  url: FOR_LLM_CANONICAL,
  name: content.meta.title,
  description: content.meta.description,
  isPartOf: { '@id': `${BRAND.siteUrl}/#website` },
  about: { '@id': `${BRAND.siteUrl}/#organization` },
  inLanguage: 'en',
});

export { organizationJsonLd };
