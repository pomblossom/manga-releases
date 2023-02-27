import { IMangaPublisher } from "./interfaces";
import { MangaReleaseJson } from "./interfaces";

/**
 * Base class for manga publishers (WIP)
 */
export abstract class MangaPublisher implements IMangaPublisher {

    private _name: string;
    private _twitterUserName: string;
    private _tweetKeywords: string;

    constructor(name: string, twitterUserName: string, tweetKeywords: string) { 
        this._name = name;
        this._twitterUserName = twitterUserName;
        this._tweetKeywords = tweetKeywords;
    }

    // Getters
    get name(): string {
        return this._name;
    }
    get twitterUserName(): string {
        return this._twitterUserName;
    }
    get tweetKeywords(): string {
        return this._tweetKeywords;
    }

    // Each publisher composes their tweets differently and thus needs to have its own text parse implementation
    // TODO: Error handling if jsonResponse is empty
    abstract parseResponseData(jsonResponse: Array<any>) : Array<MangaReleaseJson>;
}

/**
 * List of publishers (non-exhaustive)
 */
export class SevenSeas extends MangaPublisher {

    constructor(name: string, twitterUserName: string, tweetKeywords: string) {
        super(name, twitterUserName, tweetKeywords);
    }

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

export class KodanshaUSA extends MangaPublisher {

    constructor(name: string, twitterUserName: string, tweetKeywords: string) {
        super(name, twitterUserName, tweetKeywords);
    }

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

export class VizMedia extends MangaPublisher {
    
    constructor(name: string, twitterUserName: string, tweetKeywords: string) {
        super(name, twitterUserName, tweetKeywords);
    }

    parseResponseData(jsonResponse: Array<any>) : Array<MangaReleaseJson> {
        const parsedList = jsonResponse.map((obj : any) => {
            const splitString = obj.text.split('\n').filter((item : any) => item);
            return {
                // Use regex lookahead to isolate the title
                title: splitString[0].split(/(?=is now available)/)[0],
                date: obj.created_at,
                // Viz Media does not include volume descriptions in their tweets
                description: ""
            }
        });
        return parsedList;
    }
}
