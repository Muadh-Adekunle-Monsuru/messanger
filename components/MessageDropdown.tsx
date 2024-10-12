import React, { Dispatch, SetStateAction } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function MessageDropdown({
	friendId,
	messageId,
	userId,
	starred,
	showReaction,
}: {
	friendId: string;
	messageId: string;
	userId: string;
	starred?: boolean;
	showReaction: Dispatch<SetStateAction<boolean>>;
}) {
	const setStar = useMutation(api.actions.starMessage);
	const deleteMessage = useMutation(api.actions.deleteMessage);
	const toggleStar = async () => {
		await setStar({ friendId, messageId, userId });
	};
	const handleDelete = async () => {
		await deleteMessage({ friendId, messageId, userId });
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='opacity-0 group-hover:opacity-75 transition-opacity outline-none'>
				<ChevronDown className='size-5 cursor-pointer text-muted-foreground' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Reply</DropdownMenuItem>
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
