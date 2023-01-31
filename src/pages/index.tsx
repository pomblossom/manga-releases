import Head from 'next/head'
import MangaRelease from '@/components/mangarelease'
import styles from '@/styles/Home.module.css'
import { getReleases } from '@/lib/get-releases';

// temp data
const RELEASES_TEMP = [
  {
    "bookTitle": "Vinland Saga, vol. 1",
    "publicationDate": "January 29, 2023",
    "publisher": "Kodansha USA"
  }, 
  {
    "bookTitle": "Slam Dunk, vol. 30",
    "publicationDate": "January 29, 2023",
    "publisher": "VIZ Media"
  }
]

// TODO: Get this data from Twitter API
// For now, just get data from one user
const userId = 100293178;

export async function getStaticProps() {
  const allReleaseData = getReleases(userId);
  // console.log("allReleaseData", allReleaseData);
  return {
    props: {
      
    }
  };
}

export default function Home({}) {

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
