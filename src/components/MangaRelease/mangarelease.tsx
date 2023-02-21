import Date from '../Date/Date'
import styles from './MangaRelease.module.css'

interface MangaReleaseProps {
    bookTitle: string,
    publicationDate: string,
    bookSummary: string,
    bookUrl?: string,
    publisher?: string
}

export default function MangaRelease(props: MangaReleaseProps) {
    return (
        <div className={styles['release-card']}>
            <div className={styles['release-title']}>{props.bookTitle}</div>
            <Date 
                dateString={props.publicationDate} 
                className={styles['release-date']}
            />
            <div>{props.bookSummary}</div>
        </div>
    )
}