/**
 * Helper function to fetch tweet data using Twitter API endpoints
 * @param userId 
 */
export async function getReleases(userName: string) : Promise<any> {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
    myHeaders.append("Cookie", `${process.env.COOKIE}`);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // API string
    const searchParams = `?query=from:${userName} "Out today"&tweet.fields=created_at,attachments,entities,author_id&expansions=attachments.media_keys&media.fields=preview_image_url,url`;
    const twitterSearchApiEndpoint = "https://api.twitter.com/2/tweets/search/recent" + searchParams;

    // API call
    const res = await fetch(twitterSearchApiEndpoint, requestOptions);
    const result = await res.json();

    return result.data;
}

