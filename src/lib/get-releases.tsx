/**
 * Helper function to fetch tweet data using Twitter API endpoints
 * @param userId 
 */
export async function getReleases(userId: number) : Promise<any> {

    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
    myHeaders.append("Cookie", `${process.env.COOKIE}`);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=created_at,attachments&media.fields=preview_image_url&user.fields=profile_image_url`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


    // let mangaReleaseArray: MangaRelease[] = [];
    // return mangaReleaseArray;
}

