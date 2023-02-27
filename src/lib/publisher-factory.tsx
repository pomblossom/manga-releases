import { KodanshaUSA, SevenSeas, VizMedia } from "./classes";
import { MangaPublisher } from "./classes";

/**
 * Publisher factory
 * @param publisherName 
 */
export function GetPublisher(publisherName : string) : MangaPublisher {

    // TODO: Revisit this... I don't like the string literals
    switch(publisherName) {
        case "Seven Seas":
            return new SevenSeas("Seven Seas", "gomanga", "Out today");
        case "Kodansha USA":
            return new KodanshaUSA("Kodansha USA", "kodanshamanga", "NEW Kodansha");
        case "Viz Media":
            return new VizMedia("Viz Media", "vizmedia", "is now available");
        default:
            throw new Error('Cannot initialize publisher class');
    }
}