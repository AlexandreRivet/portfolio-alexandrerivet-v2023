import { getSharedMetadata } from "@/data/shared-metadata";
import { getDictionary } from "@/locales/dictionary";
import { Locale } from "@/locales/i18n-config";
import type { Metadata } from "next";

export const generateMetadata = async ({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> => {
  const dictionary = await getDictionary(lang);
  return getSharedMetadata(lang, '/contact', dictionary.contact.metadata);
};


export default async function Contact({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <div>{dictionary.contact.content.description}</div>
}