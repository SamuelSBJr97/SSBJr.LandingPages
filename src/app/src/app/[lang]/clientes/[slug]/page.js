import ClienteLandingPage from '../../../clientes/[slug]/page';

export default async function LocalizedClienteLanding({ params }) {
  // params contains { lang, slug }
  // For static export, this file simply delegates to the original page which reads slug
  // We pass-through params with the same shape as before.
  return ClienteLandingPage({ params: { slug: params.slug } });
}

export async function generateStaticParams() {
  // Generate language-prefixed routes for each slug
  const { allSlugs } = await import('../../../data/landingPagesData');
  const locales = ['pt-BR', 'en-US', 'es-ES'];
  const params = [];
  allSlugs().forEach(slug => {
    locales.forEach(lang => params.push({ lang, slug }));
  });
  return params;
}
