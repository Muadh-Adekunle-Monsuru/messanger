import { create } from 'zustand';

type DataStore = {
	messageId: string;
	content: string;
	imageURL?: string;
	senderId: string;
	setDataSore: ({
		content,
		messageId,
		imageURL,
		senderId,
	}: {
		messageId: string;
		content: string;
		imageURL?: string;
		senderId: string;
	}) => void;
};
export const useDataStore = create<DataStore>((set) => ({
	name: 'store',
	messageId: '',
	content: '',
	imageURL: '',
	senderId: '',
	setDataSore: (val) => {
		set(() => ({
			messageId: val.messageId,
			content: val.content,
			imageURL: val.imageURL,
			senderId: val.senderId,
		}));
	},
}));
