import { IMangaPublisher } from "./interfaces";
import { MangaReleaseJson } from "./interfaces";

/**
 * Base class for manga publishers (WIP)
 */
export abstract class MangaPublisher implements IMangaPublisher {

    // Getters
    // TODO: These should just be the same for all child classes
    abstract get name(): string;
    abstract get twitterUserName(): string;
    abstract get tweetKeywords(): string;

    // Each publisher composes their tweets differently and thus needs to have its own text parse implementation
    abstract parseResponseData(jsonResponse: Array<any>) : Array<MangaReleaseJson>;

    constructor() { }
}

/**
 * List of publishers (non-exhaustive)
 */
export class SevenSeas extends MangaPublisher {
    private _name = "Seven Seas";
    private _twitterUserName = "gomanga";
    private _tweetKeywords = "Out today";

    constructor() {
        super();
    }

    get name(): string { 
        return this._name; 
    }

    get twitterUserName(): string {
        return this._twitterUserName;
    }

    get tweetKeywords(): string {
        return this._tweetKeywords;
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
    private _name = "Kodansha USA";
    private _twitterUserName = "kodanshamanga";
    private _tweetKeywords = "NEW Kodansha";

    constructor() {
        super();
    }

    get name(): string { 
        return this._name; 
    }

    get twitterUserName(): string {
        return this._twitterUserName;
    }

    get tweetKeywords(): string {
        return this._tweetKeywords;
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