import type { NextApiRequest, NextApiResponse } from 'next'
import { PUBLISHER_LIST } from '@/lib/publisher-data'
import { MangaReleaseJson } from '@/lib/interfaces';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<MangaReleaseJson> | {}>
) {

  const { publisherName } = req.query;

  if (typeof publisherName === 'string') {
    // TODO: do we need to use promise syntax?
    const parsedData = await getData(publisherName);
    res.status(200).json({ data: parsedData })
  } else {
    res.status(500).json({ error: 'Could not determine publisher name' });
  }
}

/**
 * Helper function to fetch API data.
 * This was initially inside this route's handler method but was extracted here so that it could be used in getServerSideProps()
 * @param publisherName 
 */
// TODO: How to cache this to avoid unnecessary API calls? (Do we even need to?)
export async function getData(publisherName : string) : Promise<Array<MangaReleaseJson>>{

  // Get publisher username and keywords
  const publisher = PUBLISHER_LIST.find(p => p.publisherName === publisherName); 

  // API call
  if (publisher != null) {
    const userName = publisher.publisherTwitterHandle;
    const keywords = publisher.publisherKeywords;

    const queryParams = `from:${userName} "${keywords}"&tweet.fields=created_at`;
    const twitterSearchApiEndpoint = "https://api.twitter.com/2/tweets/search/recent?query=" + queryParams;

    // TODO: do we need to use promise syntax?
    const response = await axios.get(
      twitterSearchApiEndpoint, 
      {
        headers: {
          'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
          'Cookie': `${process.env.COOKIE}`
        }
      });

      const parsedData : Array<MangaReleaseJson> = publisher.parseResponseData(response.data.data);
      return parsedData;
    
  } else {
    // TODO: More intuitive error handling for this scenario
    return new Array<MangaReleaseJson>();
  }
}
