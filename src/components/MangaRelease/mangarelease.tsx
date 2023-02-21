import styles from '@/styles/MangaRelease.module.css'

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
            <div className={styles['release-date']}>{props.publicationDate}</div>
            <div>{props.bookSummary}</div>
        </div>
    )
}