import './globals.css'
import AnalyticsWrapper from '@/components/analytics';
import { Locale, i18n } from '@/locales/i18n-config';
import type { Metadata } from 'next';
import { getDictionary } from '@/locales/dictionary';
import { getSharedMetadata } from '@/data/shared-metadata';
import WebGLSwitcher from '@/components/WebGLSwitcher';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const generateMetadata = async ({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> => {
  const dictionary = await getDictionary(lang);
  return getSharedMetadata(lang, '/', dictionary.home.metadata);
};

export default function Root({
  children,
  params: { lang }
}: {
  children: React.ReactNode,
  params: { lang: string }
}) {
  return (
    <html lang={lang}>
      <head />
      <body>
        <WebGLSwitcher lang={lang}>
          <header>
            <nav>

            </nav>
          </header>
          <main>
            {children}
          </main>
          <footer>
            TOTO
          </footer>
        </WebGLSwitcher>
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
