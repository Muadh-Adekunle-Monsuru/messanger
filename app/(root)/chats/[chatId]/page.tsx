'use client';
import ChatHeader from '@/components/ChatHeader';
import ChatInputBar from '@/components/ChatInputBar';
import { api } from '@/convex/_generated/api';
import { useQueries, useQuery } from 'convex/react';
import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { chatId: string } }) {
	const friendData = useQuery(api.actions.getFriends, {
		userId: params.chatId,
	});

	if (friendData == 'no user') redirect('/chats');
	return (
		<div className='h-full w-full largesidebar-background flex flex-col gap-4 items-center blur-[0.3px]'>
			<ChatHeader friendData={friendData} />
			My Chat: {params.chatId}
			<ChatInputBar />
		</div>
	);
}
