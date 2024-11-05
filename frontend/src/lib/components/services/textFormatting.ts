// import type { Coordinate } from 'ol/coordinate';
// import { fromLonLat } from 'ol/proj';

export type ITableAction = {
	buttonText: string;
	buttonIcon?: string;
	buttonAction: (param) => void;
	disabled?: boolean;
};

export function formatFileSize(bytes: number | string): string {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
	let size = parseInt(String(bytes), 10);

	if (isNaN(size)) {
		throw new Error('Invalid input: ' + bytes);
	}

	let i = 0;

	while (size >= 1024 && i < units.length - 1) {
		size /= 1024;
		i++;
	}

	return size.toFixed(2) + ' ' + units[i];
}

export function formatMilliseconds(milliseconds: number): string {
	let seconds = Math.floor(milliseconds / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	const parts: string[] = [];

	if (hours) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
	if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
	if (seconds || (!hours && !minutes)) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

	return parts.join(' ');
}

export function toCamelCase(text: string): string {
	return text.replace(/[^a-zA-Z0-9]+(.)/g, (_, character) => character.toUpperCase());
}

export function toSnakeCase(text: string): string {
	return text
		.replace(/[^\w\s]/g, ' ')
		.replace(/([A-Z])/g, ' $1')
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '_');
}

export function toTitleCase(input: string): string {
	const trimmedInput = input.trim();
	const words = trimmedInput.split(/[\s_]|(?=[A-Z])/);
	const formattedWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	const formattedString = formattedWords.join(' ');

	return formattedString;
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	});
}
