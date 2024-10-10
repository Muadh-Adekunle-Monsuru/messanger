import { format } from 'date-fns';
export function formatTime(timestamp: string) {
	const date = new Date(timestamp); // Convert the timestamp to a Date object
	return format(date, 'h:mm a');
}
