'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatBodyMenu({
	userId,
	friendId,
}: {
	userId?: string | null;
	friendId?: string;
}) {
	const router = useRouter();
	const clearChat = useMutation(api.actions.clearChat);
	const handleClearChat = () => {
		clearChat({ userId: userId || '', friendId: friendId || '' });
	};
	const deleteChat = useMutation(api.actions.deleteChat);
	const handleDeleteChat = async () => {
		await deleteChat({ userId: userId || '', friendId: friendId || '' });
		router.push('/chats');
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<EllipsisVertical className='size-5' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={handleClearChat}>
					Clear Chat
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDeleteChat}>
					Delete Chat
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
