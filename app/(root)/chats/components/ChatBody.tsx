'use client';
import MessageContainer from '@/components/MessageContainer';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

export type ChatType = {
	friendUserName: string;
	friendUserId: string;
	friendImageUrl: string;
	messages: {
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
	}[];
};
export default function ChatBody({
	chat,
	userId,
}: {
	chat: ChatType | undefined | 'no user';
	userId?: string;
}) {
	const lastDivRef = useRef<any>(null);
	useEffect(() => {
		lastDivRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [chat]);

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
					<>
						<MessageContainer
							key={message.messageId}
							message={message}
							userId={userId}
							friendId={chat.friendUserId}
						/>
						<div ref={lastDivRef} className='size-0'></div>
					</>
				))}
		</div>
	);
}
