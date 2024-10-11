'use client';
import { formatTime } from '@/lib/server-functions';
import { CheckCheck } from 'lucide-react';
import MessageDropdown from './MessageDropdown';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';


export type MessageType = {
	imageUrl?: string | undefined;
	messageId: string;
	content: string;
	sender: string;
	date: string;
	seen: boolean;
	deleted: boolean;
};
export default function MessageContainer({
	message,
	userId,
}: {
	message: MessageType;
	userId?: string;
}) {
	const { content, date, deleted, messageId, seen, sender, imageUrl } = message;
	return (
		<div
			className={`rounded-md bg-white my-1 p-2 relative w-fit ${userId == sender && 'ml-auto bg-slate-100'} shadow-sm group `}
		>
			<p className='font-thin pr-10 pb-1'>{content}</p>
			<MessageDropdown />
			<div className='absolute bottom-0 right-1 text-[0.6rem] text-neutral-500 font-thin flex gap-1'>
				<span>{formatTime(date)}</span>
				<span className={` ${userId !== sender && 'hidden'}`}>
					<CheckCheck className='size-3 text-blue-400' />
				</span>
			</div>
		</div>
	);
}
