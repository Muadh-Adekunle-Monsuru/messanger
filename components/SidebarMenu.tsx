import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

export default function SidebarMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
					<EllipsisVertical className='size-5 cursor-pointer' />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>New Group</DropdownMenuItem>
				<DropdownMenuItem>Starred Messages</DropdownMenuItem>
				<DropdownMenuItem>
					<SignOutButton>Log Out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
