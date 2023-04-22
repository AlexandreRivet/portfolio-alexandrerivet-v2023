import './globals.css'
import AnalyticsWrapper from '@/components/analytics';
import { Locale, i18n } from '@/locales/i18n-config';
import type { Metadata } from 'next';
import { getDictionary } from '@/locales/dictionary';
import { getSharedMetadata } from '@/data/shared-metadata';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const generateMetadata = async ({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> => {
  const dictionary = await getDictionary(lang);
  return getSharedMetadata(lang, '/', dictionary.home.metadata);
};

export default function Root({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <head />
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
