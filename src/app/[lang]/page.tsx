import styles from './page.module.css'
import { Locale } from '@/locales/i18n-config';
import { getDictionary } from '@/locales/dictionary';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <main className={styles.main}>
      {dictionary.home.content.description}
    </main>
  )
}
