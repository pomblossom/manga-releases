/**
 * Properties needed to fetch and parse response data from the Twitter API.
 * 
 * @interface MangaPublisher
 * @member {string} publisherName - Publisher name. This is displayed on the "filter" buttons.
 * @member {string} publisherTwitterHandle - Publisher's Twitter handle
 * @member {string} publisherKeywords - Publisher-specific keywords that identify its release tweets.
 * @member {Function} parseResponseData - Function that will parse the API JSON response. 
 */
interface MangaPublisher {
    publisherName: string,
    publisherTwitterHandle: string,
    publisherKeywords: string
    parseResponseData: Function // TODO: should not be able to add an empty function here
}

/**
 * This is a stripped down object of the JSON data received from Twitter API containing only 
 * the information needed to display on the page. Initial JSON response data will be pared down to this object.
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

/**
 * List of publisher data
 */
// TODO: Rewrite this as child classes of MangaPublisher instead of array
export const PUBLISHER_LIST: MangaPublisher[] = 
[
    {
        publisherName: "Seven Seas",
        publisherTwitterHandle: "gomanga",
        publisherKeywords: "Out today",
        parseResponseData: function(jsonResponse: Array<any>) : Array<MangaReleaseJson> {
            const parsedList = jsonResponse.map((obj : any) => {
                const splitString = obj.text.split('\n').filter((item : any) => item); // remove empty strings
                return {
                    title: splitString[0],
                    date: obj.created_at,
                    description: splitString[1]
                }
            });
            return parsedList;
        }
    },
    {
        publisherName: "Kodansha USA",
        publisherTwitterHandle: "KodanshaManga",
        publisherKeywords: "NEW Kodansha",
        parseResponseData: function(jsonResponse: Array<any>) : Array<MangaReleaseJson> { 
            const parsedList = jsonResponse.map((obj : any) => {
                const splitString = obj.text.split('\n').filter((item : any) => item);
                return {
                    title: splitString[1],
                    date: obj.created_at,
                    description: splitString[3]
                }
            });
            return parsedList;
        } 
    }
]

export const PUBLISHER_NAMES : Array<string> = PUBLISHER_LIST.map(mangaPublisher => mangaPublisher.publisherName);