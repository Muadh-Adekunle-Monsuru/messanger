import { format, isToday } from 'date-fns';
export function formatTime(timestamp: string) {
	const date = new Date(timestamp); // Convert the timestamp to a Date object
	if (isToday(date)) {
		return format(date, 'h:mm a');
	}
	return format(date, 'ccc h:mm a');
}
