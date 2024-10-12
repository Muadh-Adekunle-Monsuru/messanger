import React from 'react';
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
}: {
	friendId: string;
	messageId: string;
	userId: string;
	starred?: boolean;
}) {
	const setStar = useMutation(api.actions.starMessage);
	const toggleStar = async () => {
		await setStar({ friendId, messageId, userId });
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='opacity-0 group-hover:opacity-75 transition-opacity outline-none'>
				<ChevronDown className='size-5 cursor-pointer text-muted-foreground' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Reply</DropdownMenuItem>
				<DropdownMenuItem>React</DropdownMenuItem>
				<DropdownMenuItem onClick={toggleStar}>
					{starred ? 'Unstar' : 'Star'}
				</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
