import { MangaReleaseProps } from '@/shared/interfaces/mangarelease.interface'
import styles from '../styles/Home.module.css'

export default function MangaRelease(props: MangaReleaseProps) {
    return (
        <div className={styles['release-card']}>
            <div>{props.bookTitle}</div>
            <div>{props.publisher}</div>
        </div>
    )
}