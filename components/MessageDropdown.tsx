import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { api } from '@/convex/_generated/api';
import { useDataStore } from '@/store/store';
import { useMutation } from 'convex/react';
import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function MessageDropdown({
	friendId,
	messageId,
	userId,
	starred,
	showReaction,
	content,
	imageURL,
	senderId,
}: {
	friendId: string;
	messageId: string;
	userId: string;
	starred?: boolean;
	showReaction: Dispatch<SetStateAction<boolean>>;
	content?: string;
	imageURL?: string;
	senderId: string;
}) {
	const setStar = useMutation(api.actions.starMessage);
	const deleteMessage = useMutation(api.actions.deleteMessage);
	const toggleStar = async () => {
		await setStar({ friendId, messageId, userId });
	};
	const handleDelete = async () => {
		await deleteMessage({ friendId, messageId, userId });
	};
	const setReply = useDataStore((state) => state.setDataSore);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='opacity-0 group-hover:opacity-75 transition-opacity outline-none'>
				<ChevronDown className='size-5 cursor-pointer text-muted-foreground' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() =>
						setReply({ content: content || '', messageId, imageURL, senderId })
					}
				>
					Reply
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => showReaction((prev) => !prev)}>
					React
				</DropdownMenuItem>
				<DropdownMenuItem onClick={toggleStar}>
					{starred ? 'Unstar' : 'Star'}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
