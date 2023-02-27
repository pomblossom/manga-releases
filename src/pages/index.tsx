import { PUBLISHER_LIST } from '@/lib/publisher-data';
import { useState } from 'react';
import { getData } from './api/getReleases';
import { MangaReleaseJson } from '@/lib/publisher-data';
import axios from 'axios';
import Head from 'next/head'
import FilterButton from '@/components/FilterButton/FilterButton';
import styles from '@/styles/Home.module.css'
import MangaRelease from '@/components/MangaRelease/MangaRelease';

export async function getServerSideProps() {
  // On page load, get data from one user only
  const defaultPublisherName = "Seven Seas";
  const releaseData = await getData(defaultPublisherName);
  return {
    props: {
      releaseData
    }
  };    
}

interface HomeProps { 
  releaseData: any
}

export default function Home(props: HomeProps) {

  const [data, setData] = useState(props.releaseData);

  // This needs to be inside the component so we can use setData hook
  async function getData(publisherName: string) {
    try {
      const response = await axios.get(`/api/getReleases?publisherName=${publisherName}`)
        .then(response => {
          setData(response.data.data);
        });
    } catch (error) {
      console.log("fetch error", error);
    }
  }

  const releaseList = data.map((r : MangaReleaseJson) => {
    return (
      <MangaRelease
        bookTitle={r.title}
        publicationDate={r.date}
        bookSummary={r.description} 
      />
    )
  })

  const filterList = PUBLISHER_LIST
    .map(p => p.publisherName)
    .map(name => (
      <FilterButton 
        publisherName={name} 
        isPressed={true}
        fetchData={getData} 
      />
    ));

  return (
    <>
      <Head>
        <title>Manga Releases</title>
        <meta name="description" content="Weekly manga releases from North American publishers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles['page-header']}>lalala</h1>
        <div className={styles.filters}>
          {filterList}
        </div>
        <ul
          role="list"
          className={styles["releases-grid"]}
        >
          { releaseList }
        </ul>
      </main>
    </>
  )
}
