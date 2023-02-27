import { IMangaPublisher } from "./interfaces";
import { MangaReleaseJson } from "./interfaces";

/**
 * List of publisher data
 */
// TODO: Rewrite this as child classes of MangaPublisher instead of array
export const PUBLISHER_LIST: IMangaPublisher[] = 
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