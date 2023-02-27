import { IMangaPublisher } from "./interfaces";
import { MangaReleaseJson } from "./interfaces";

/**
 * Base class for manga publishers (WIP)
 */
abstract class MangaPublisher implements IMangaPublisher {
    publisherName: string;
    publisherTwitterHandle: string;
    publisherKeywords: string;

    // Each publisher composes their tweets differently and thus needs to have its own text parse implementation
    abstract parseResponseData(jsonResponse: Array<any>) : Array<MangaReleaseJson>;

    constructor(name: string, username: string, keywords: string) {
        this.publisherName = name;
        this.publisherKeywords = keywords;
        this.publisherTwitterHandle = username;
    }
}

/**
 * List of publishers (non-exhaustive)
 */
class SevenSeas extends MangaPublisher {
    publisherName = "Seven Seas";
    publisherTwitterHandle = "gomanga";
    publisherKeywords = "Out today";

    parseResponseData(jsonResponse: Array<any>) : Array<MangaReleaseJson> {
        const parsedList = jsonResponse.map((obj : any) => {
            const splitString = obj.text.split('\n').filter((item : any) => item); 
            return {
                title: splitString[0],
                date: obj.created_at,
                description: splitString[1]
            }
        });
        return parsedList;
    }
}

class KodanshaUSA extends MangaPublisher {
    publisherName = "Kodansha USA";
    publisherTwitterHandle = "kodanshamanga";
    publisherKeywords = "NEW Kodansha";

    parseResponseData(jsonResponse: Array<any>) : Array<MangaReleaseJson> {
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