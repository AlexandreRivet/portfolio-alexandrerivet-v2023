import { getSharedMetadata } from "@/data/shared-metadata";
import { getDictionary } from "@/locales/dictionary";
import { Locale } from "@/locales/i18n-config";
import type { Metadata } from "next";

export const generateMetadata = async ({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> => {
  const dictionary = await getDictionary(lang);
  return getSharedMetadata(lang, '/about', dictionary.about.metadata);
};


export default async function About({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <div>{dictionary.about.content.description}</div>
}