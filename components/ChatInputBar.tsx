'use client';
import React, { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Image, Plus, SendHorizonal, Smile } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from './ui/button';
import { friendDataType } from './ChatHeader';
import { nanoid } from 'nanoid';
import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import InputBarDialog from './InputBarDialog';
import { CldUploadWidget } from 'next-cloudinary';

export default function ChatInputBar({
	userId,
	friendData,
	friendId,
}: {
	userId: string | undefined;
	friendData?: friendDataType;
	friendId: string;
}) {
	const sendMessage = useMutation(api.actions.sendMessage);
	const [message, setMessage] = useState('');
	const [showEmoji, setShowEmoji] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const setTyping = useMutation(api.actions.setTyping);

	const timeoutId = useRef<number | null>(null);
	const handleSubmit = async (e?: FormEvent) => {
		if (e) {
			e.preventDefault();
		}
		if (!friendData) return;
		if (!userId) return;
		await sendMessage({
			userId,
			data: {
				friendUserName: friendData.userName || '',
				friendImageUrl: friendData.imageUrl || '',
				friendUserId: friendId,
				messages: {
					messageId: nanoid(),
					content: message,
					date: new Date().toString(),
					deleted: false,
					seen: false,
					sender: userId,
					imageUrl,
				},
			},
		});
		setMessage('');
		setImageUrl('');
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (!userId) return;
		if (timeoutId.current) clearTimeout(timeoutId.current);

		setTyping({ userId, value: true, friendId });

		timeoutId.current = window.setTimeout(() => {
			setTyping({ userId, value: false, friendId });
		}, 4000);

		if (e.key === 'Enter') {
			if (e.shiftKey) {
				// If Shift + Enter is pressed, insert a new line
				e.preventDefault();
				setMessage(message + '\n');
			} else {
				// If only Enter is pressed, submit the form (or perform any submit action)
				e.preventDefault();
				handleSubmit();
			}
		}
	};

	const addEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
		setMessage((prev) => prev + emojiData.emoji);
	};
	return (
		<div className='w-full  bg-neutral-100 shadow-sm sticky bottom-0 left-0 right-0 '>
			<form
				className='p-3 flex items-center justify-between gap-2'
				onSubmit={handleSubmit}
			>
				{imageUrl && (
					<div className='absolute bottom-14 left-5 z-[99999] shadow-lg rounded-xl'>
						<img
							src={imageUrl}
							className='size-32 border-4 rounded-xl border-white'
						/>
					</div>
				)}
				<div
					className='absolute bottom-20 left-5 z-[99999] shadow-lg'
					onBlur={() => {
						setShowEmoji(false);
					}}
				>
					<EmojiPicker
						open={showEmoji}
						height={300}
						width={250}
						className=''
						previewConfig={{ showPreview: false }}
						onEmojiClick={addEmoji}
					/>
				</div>
				<div className='cursor-pointer hover:bg-neutral-200 rounded-md p-1 transition-colors'>
					<Smile
						className='size-6 text-neutral-500'
						onClick={() => setShowEmoji(true)}
					/>
				</div>
				<CldUploadWidget
					uploadPreset='damkxve6'
					onSuccess={(result: any, { widget }) => {
						setImageUrl(result.info?.secure_url);
					}}
					options={{ maxFiles: 1 }}
				>
					{({ open }) => {
						return (
							<div onClick={() => open?.()}>
								<Image className='size-6 cursor-pointer text-neutral-500' />
							</div>
						);
					}}
				</CldUploadWidget>
				<textarea
					placeholder='Type a message'
					className='w-full focus:outline-none p-2 border rounded-md h-10'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => handleKeyDown(e)}
				></textarea>
				<Button variant={'ghost'} type='submit'>
					<SendHorizonal className='size-6 text-neutral-500 cursor-pointer' />
				</Button>
			</form>
		</div>
	);
}
