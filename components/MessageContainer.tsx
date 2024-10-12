'use client';
import { formatTime } from '@/lib/server-functions';
import { CheckCheck, Smile, Star } from 'lucide-react';
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
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export type MessageType = {
	imageUrl?: string | undefined;
	messageId: string;
	content?: string | undefined;
	sender: string;
	date: string;
	seen: boolean;
	deleted: boolean;
	starred?: boolean | undefined;
	emoji?: string | undefined;
};
export default function MessageContainer({
	message,
	userId,
	friendId,
}: {
	message: MessageType;
	userId?: string;
	friendId: string;
}) {
	const {
		content,
		date,
		deleted,
		messageId,
		seen,
		sender,
		imageUrl,
		starred,
		emoji,
	} = message;

	const [showReaction, setShowReaction] = useState(false);
	const reactToMessage = useMutation(api.actions.reactMessage);
	const handleReaction = async (
		emojiData: EmojiClickData,
		event: MouseEvent
	) => {
		event.stopPropagation();
		console.log('picked', emojiData);
		await reactToMessage({
			userId: userId || '',
			friendUserId: friendId,
			emoji: emojiData.emoji,
			messageId,
		});
	};
	return (
		<div
			className={`rounded-lg bg-white ${emoji ? 'my-2' : 'my-1'}  p-2 w-fit ${userId == sender && 'ml-auto bg-blue-50'} shadow-sm group relative max-w-sm`}
		>
			<div
				className={`size-6 bg-neutral-200/20 rounded-full flex items-center justify-center absolute  ${userId == sender && '-left-7'} -right-7 top-[35%] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`}
				onClick={() => {
					setShowReaction(true);
				}}
			>
				<Smile className='size-4 text-neutral-400' fill='white' />
			</div>

			{imageUrl && !deleted && (
				<a className='max-w-sm mb-1' href={imageUrl} target='_blank'>
					<img src={imageUrl} className='object-contain rounded-lg' />
				</a>
			)}

			<p className='font-thin pr-10 pb-1'>
				{deleted ? (
					<p className='italic text-xs'>This message has been deleted</p>
				) : (
					content
				)}
			</p>

			<div className='absolute top-0 right-2 z-1 '>
				<MessageDropdown
					friendId={friendId}
					userId={userId || ''}
					messageId={messageId}
					starred={starred}
					showReaction={setShowReaction}
				/>
			</div>

			<div
				className={`absolute -top-5  shadow-2xl ${userId == sender ? 'right-2' : 'left-7'} rounded-3xl z-20`}
				onBlur={() => {
					setShowReaction(false);
				}}
			>
				<EmojiPicker
					open={showReaction}
					reactionsDefaultOpen={true}
					onReactionClick={handleReaction}
					className='absolute'
					height={300}
					previewConfig={{ showPreview: false }}
					allowExpandReactions={false}
				/>
			</div>
			<div className='absolute bottom-0 right-1 text-[0.6rem] text-neutral-500 font-thin flex gap-1 items-center'>
				{starred && <Star className='size-2 ' fill='black' />}
				<span>{formatTime(date)}</span>
				<span className={` ${userId !== sender && 'hidden'}`}>
					<CheckCheck className='size-3 text-blue-400' />
				</span>
			</div>
			{emoji && (
				<p className='absolute right-0 -bottom-5 rounded-full bg-white p-1 text-xs z-10'>
					{emoji}
				</p>
			)}
		</div>
	);
}
