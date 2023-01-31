import styles from '../styles/Home.module.css'

interface MangaReleaseProps {
    bookTitle: string,
    publicationDate: string,
    publisher: string
}

export default function MangaRelease(props: MangaReleaseProps) {
    return (
        <div className={styles['release-card']}>
            <div>{props.bookTitle}</div>
            <div>{props.publisher}</div>
        </div>
    )
}