import { parseISO, format } from 'date-fns';

interface DateProps {
    dateString: string,
    className: string
}

export default function Date(props: DateProps) {
    const date = parseISO(props.dateString);
    return <time dateTime={props.dateString} className={props.className}>{format(date, 'LLLL d, yyyy')}</time>
}