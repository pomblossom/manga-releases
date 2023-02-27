/**
 * Properties needed to fetch and parse response data from the Twitter API.
 * 
 * @interface MangaPublisher
 * @member {string} publisherName - Publisher name. This is displayed on the "filter" buttons.
 * @member {string} publisherTwitterHandle - Publisher's Twitter handle
 * @member {string} publisherKeywords - Publisher-specific keywords that identify its release tweets.
 * @member {Function} parseResponseData - Function that will parse the API JSON response. 
 */
export interface IMangaPublisher {
    publisherName: string,
    publisherTwitterHandle: string,
    publisherKeywords: string
    parseResponseData: Function // TODO: should not be able to add an empty function here
}

/**
 * JSON object containing only the necessary properties that are displayed on the page.
 * Initial JSON response data from Twitter API will be pared down to this object.
 * 
 * @interface MangaReleaseJson
 * @member {string} title - Manga title
 * @member {string} date - Tweet date
 * @member {string} description - Manga description
 */
export interface MangaReleaseJson {
    title: string,
    date: string,
    description: string
}