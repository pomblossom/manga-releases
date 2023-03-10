import styles from './FilterButton.module.css'

interface FilterButtonProps {
    publisherName: string
    isPressed:  boolean
    fetchData: Function
}

export default function FilterButton(props: FilterButtonProps) {
    return (
        <button
            type="button"
            className={styles['btn']}
            aria-pressed={props.isPressed}
            onClick={() => props.fetchData(props.publisherName)}
        >
            {props.publisherName}
        </button>
    )
}