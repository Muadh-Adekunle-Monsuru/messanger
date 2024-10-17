'use client';
import ChatHeader from '@/components/ChatHeader';
import ChatInputBar from '@/components/ChatInputBar';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { redirect } from 'next/navigation';
import ChatBody from '../components/ChatBody';

export default function Page({ params }: { params: { chatId: string } }) {
	const { user } = useUser();

	const friendData = useQuery(api.actions.getFriends, {
		userId: params.chatId,
	});

	const chat = useQuery(api.actions.getChat, {
		userId: user?.id || '',
		friendId: params.chatId,
	});

	if (chat == 'no user' && friendData == 'no user') {
		redirect('/chats');
	}
	return (
		<div className='h-full w-full largesidebar-background flex flex-col gap-4 items-center blur-[0.3px] overflow-x-hidden overflow-y-auto relative   scrollbar scrollbar-w-1 scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-thumb-rounded-full '>
			<ChatHeader friendData={friendData} userId={user?.id} />
			<ChatBody chat={chat} userId={user?.id} />
			<ChatInputBar
				userId={user?.id}
				friendData={friendData}
				friendId={params.chatId}
			/>
		</div>
	);
}
