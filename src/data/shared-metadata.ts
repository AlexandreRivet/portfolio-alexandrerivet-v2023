import type { Metadata as NextMetadata } from "next";
import { Metadata } from "@/locales/types";
import { info } from "./info";
import { i18n } from "@/locales/i18n-config";
import { getRootUrl, getPublicUrl } from "@/utils";

export const getSharedMetadata = (lang: string, url = '/', metadata: Metadata = {}): NextMetadata => {
  const fMetadata = {
    ...metadata,
    title: [metadata.title, info.name].filter((value) => typeof value !== 'undefined').join(' | '),
  }
  const rUrl = getRootUrl();
  const fUrl = getPublicUrl(url);
  return {
    applicationName: info.name,
    authors: { name: info.name, url: rUrl },
    creator: info.name,
    publisher: info.name,
    keywords: [info.name, 'Creative Developer', 'WebGL'],
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
      { media: "(prefers-color-scheme: light)", color: "#ffffff" }
    ],
    colorScheme: "dark",
    viewport: { width: "device-width", initialScale: 1 },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(i18n.locales.map((locale) => [locale, `${locale}${url}`]))
      }
    },
    robots: 'index, follow',
    // @todo: icons: 
    manifest: '/manifest.json',
    openGraph: {
      emails: info.mail,
      siteName: info.name,
      locale: lang,
      alternateLocale: i18n.locales.map((locale) => locale),
      url: fUrl,
      type: 'website',
      // @todo: images: 
      ...fMetadata,
    },
    twitter: {
      // @todo: creator:
      site: fUrl,
      card: 'summary_large_image',
      // @todo: images:
      ...fMetadata, 
    },
    appleWebApp: {
      capable: true,
      title: info.name,
      // @todo: startupImage: 
      statusBarStyle: "default"
    },
    ...fMetadata,
  }
};