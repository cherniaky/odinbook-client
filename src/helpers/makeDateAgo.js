import { formatDistance } from "date-fns";

export default function makeDateAgo(date) {
    return formatDistance(new Date(date), new Date());
}
