'use client';
import React, { FormEvent, KeyboardEvent, useState } from 'react';
import { Input } from './ui/input';
import { Plus, SendHorizonal, Smile } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from './ui/button';
import { friendDataType } from './ChatHeader';
import { nanoid } from 'nanoid';

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
				},
			},
		});
		setMessage('');
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
	return (
		<div className='w-full  bg-neutral-100 shadow-sm sticky bottom-0 left-0 right-0'>
			<form
				className='p-3 flex items-center justify-between gap-2'
				onSubmit={handleSubmit}
			>
				<Smile className='size-6 text-neutral-500 cursor-pointer' />
				<Plus className='size-6 text-neutral-500 cursor-pointer' />
				{/* <input
					placeholder='Type a message'
					className='w-full focus:outline-none p-2 border rounded-md'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					
				/> */}
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
