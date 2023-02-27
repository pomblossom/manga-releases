import { KodanshaUSA, SevenSeas } from "./classes";
import { MangaPublisher } from "./classes";

/**
 * Publisher factory
 * @param publisherName 
 */
export function GetPublisher(publisherName : string) : MangaPublisher {
    switch(publisherName) {
        case "Seven Seas":
            return new SevenSeas();
        case "Kodansha USA":
            return new KodanshaUSA();
        default:
            throw new Error('Cannot initialize publisher class');
    }
}