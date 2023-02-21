import Head from 'next/head'
import MangaRelease from '@/components/MangaRelease/mangarelease';
import styles from '@/styles/Home.module.css'
import { getReleases } from '@/lib/get-releases';

export async function getStaticProps() {

  // TODO: Get this data from Twitter API
  // For now, just get data from one user
  const userName = "gomanga";
  const allReleaseData = await getReleases(userName);
  return {
    props: {
      allReleaseData
    }
  };
}

interface HomeProps { 
  allReleaseData: any
}

export default function Home(props: HomeProps) {

  const releaseList = props.allReleaseData.map((release : any) => {
    // Get properties from body of tweet
    const releaseProperties = release.text.split('\n').filter((item : any) => item);
    return (
      <MangaRelease 
        bookTitle={releaseProperties[0]}
        publicationDate={release.created_at}
        bookSummary={releaseProperties[1]}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Manga Releases</title>
        <meta name="description" content="Weekly manga releases from North American publishers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles['page-header']}>Manga Releases</h1>
        <div className={styles.filters}></div>
        <ul
          role="list"
          className={styles["releases-grid"]}
        >
          {releaseList}
        </ul>
      </main>
    </>
  )
}
