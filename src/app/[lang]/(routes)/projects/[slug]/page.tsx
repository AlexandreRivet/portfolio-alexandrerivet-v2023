import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import JsonLd from '@/components/json-ld';
import { Locale } from '@/locales/i18n-config';
import { getDictionary } from '@/locales/dictionary';
import { getSharedMetadata } from '@/data/shared-metadata';

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const generateMetadata = async ({ params: { slug, lang } }: { params: { slug: string, lang: Locale } }): Promise<Metadata> => {
  const project = getProject(slug);

  if (typeof project === 'undefined') {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  return getSharedMetadata(
    lang,
    `/projects/${slug}`,
    {
      title: `${dictionary.project.name} - ${project.title}`
    }
  );
};

export default async function Project({ params: { slug, lang } }: { params: { slug: string, lang: Locale } }) {
  const project = getProject(slug);

  if (typeof project === 'undefined') {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  const schema = {
    "@context": "http://schema.org/",
    "@type": 'Project',
    "name": project.title,
  };

  return (
    <section>
      <JsonLd schema={schema} />
      <div>{dictionary.project.name}: ({ project.title } / { project.period })</div>
    </section>
  );
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}