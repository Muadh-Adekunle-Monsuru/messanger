'use client';
import MessageContainer from '@/components/MessageContainer';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

export type ChatType = {
	friendUserName: string;
	friendUserId: string;
	friendImageUrl: string;
	messages: {
		imageUrl?: string | undefined;
		messageId: string;
		content: string;
		sender: string;
		date: string;
		seen: boolean;
		deleted: boolean;
	}[];
};
export default function ChatBody({
	chat,
	userId,
}: {
	chat: ChatType | undefined | 'no user';
	userId?: string;
}) {
	if (chat == undefined)
		return (
			<div className='h-full w-full flex items-center justify-center'>
				<Loader2 className='size-5 animate-spin' />
			</div>
		);

	return (
		<div className='mt-auto w-full p-3 md:pr-20'>
			{chat !== 'no user' &&
				chat.messages.length > 0 &&
				chat.messages.map((message) => (
					<MessageContainer
						key={message.messageId}
						message={message}
						userId={userId}
					/>
				))}
		</div>
	);
}
