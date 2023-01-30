import Head from 'next/head'
import MangaRelease from '@/components/mangarelease'
import styles from '@/styles/Home.module.css'

// temp data
const RELEASES_TEMP = [
  {
    "bookTitle": "Vinland Saga 1",
    "publicationDate": "January 29, 2023",
    "publisher": "Kodansha USA"
  }, 
  {
    "bookTitle": "Slam Dunk 30",
    "publicationDate": "January 29, 2023",
    "publisher": "VIZ Media"
  }
]

export default function Home() {

  const releaseList = RELEASES_TEMP.map((release) => (
    <MangaRelease 
      bookTitle={release.bookTitle}
      publicationDate={release.publicationDate}
      publisher={release.publisher}
    />
  ));

  return (
    <>
      <Head>
        <title>Manga Releases</title>
        <meta name="description" content="Monthly manga releases from North American publishers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles['page-header']}>Manga Releases</h1>
        <div className={styles.filters}></div>
        <ul
          role="list"
          className="releases"
        >
          {releaseList}
        </ul>
      </main>
    </>
  )
}
