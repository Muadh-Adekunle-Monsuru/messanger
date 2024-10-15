import { create } from 'zustand';

type DataStore = {
	messageId: string;
	content: string;
	imageURL?: string;
	setDataSore: ({
		content,
		messageId,
		imageURL,
	}: {
		messageId: string;
		content: string;
		imageURL?: string;
	}) => void;
};
export const useDataStore = create<DataStore>((set) => ({
	name: 'store',
	messageId: '',
	content: '',
	imageURL: '',
	setDataSore: (val) => {
		set(() => ({
			messageId: val.messageId,
			content: val.content,
			imageURL: val.imageURL,
		}));
	},
}));
