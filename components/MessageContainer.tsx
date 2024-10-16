'use client';
import { api } from '@/convex/_generated/api';
import { formatTime } from '@/lib/server-functions';
import { useMutation } from 'convex/react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { CheckCheck, Smile, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import MessageDropdown from './MessageDropdown';
import { useInView } from 'react-intersection-observer';
import Head from 'next/head';

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
	replyingTo?: {
		messageId: string;
		content: string;
		imageURL?: string;
		senderId: string;
	};
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
		replyingTo,
	} = message;
	const setSeen = useMutation(api.actions.setSeen);
	const [showReaction, setShowReaction] = useState(false);
	const reactToMessage = useMutation(api.actions.reactMessage);

	const handleReaction = async (
		emojiData: EmojiClickData,
		event: MouseEvent
	) => {
		event.stopPropagation();
		await reactToMessage({
			userId: userId || '',
			friendUserId: friendId,
			emoji: emojiData.emoji,
			messageId,
		});
	};
	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
		triggerOnce: true,
	});

	useEffect(() => {
		if (!userId) return;
		if (userId == sender) return;
		if (seen == true) return;
		if (!inView) return;
		setSeen({ friendId, messageId, userId });
	}, [userId, messageId, friendId, inView]);

	// useEffect(() => {
	// 	if (inView) return;
	// 	console.log(`${content} is in view`);
	// }, [inView]);

	return (
		<div
			className={`rounded-lg  ${emoji ? 'my-2' : 'my-1'}  p-2 w-fit ${userId == sender ? 'ml-auto bg-blue-100' : 'bg-white'} shadow-sm group relative max-w-sm `}
			ref={ref}
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

			{(replyingTo?.content || replyingTo?.imageURL) && (
				<div className='py-2 bg-blue-50 rounded-lg p-1 flex gap-1 items-center'>
					<div
						className={`h-full border-4 rounded-lg ${replyingTo.senderId == userId ? 'border-blue-500' : 'border-purple-400'}`}
					/>
					<div className='flex gap-1 items-center'>
						<p className='line-clamp-2 select-none'>{replyingTo.content}</p>
						{replyingTo.imageURL && (
							<img src={replyingTo.imageURL} className='size-14' />
						)}
					</div>
				</div>
			)}

			<p className='font-thin pr-10 pb-1'>
				{deleted ? (
					<p className='italic text-xs'>This message has deleted</p>
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
					content={content}
					imageURL={imageUrl}
					senderId={sender}
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
					<CheckCheck
						className={`size-3 ${seen ? 'text-blue-400' : 'text-neutral-400'}`}
					/>
				</span>
			</div>

			{emoji && (
				<p className='absolute right-0 -bottom-5 rounded-full bg-white p-1 text-xs z-0'>
					{emoji}
				</p>
			)}
		</div>
	);
}
