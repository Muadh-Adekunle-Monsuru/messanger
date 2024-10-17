'use client';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function ChatListContextMenu({
	children,
	userId,
	friendId,
}: {
	children: ReactNode;
	userId: string | undefined;
	friendId: string | undefined;
}) {
	const router = useRouter();
	const clearChat = useMutation(api.actions.clearChat);
	const deleteChat = useMutation(api.actions.deleteChat);
	const handleClearChat = async () => {
		await clearChat({ userId: userId || '', friendId: friendId || '' });
	};

	const handleDeleteChat = async () => {
		await deleteChat({ userId: userId || '', friendId: friendId || '' });
		router.push('/chats');
	};
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem onClick={handleClearChat}>Clear Chat</ContextMenuItem>
				<ContextMenuItem onClick={handleDeleteChat}>
					Delete Chat
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
