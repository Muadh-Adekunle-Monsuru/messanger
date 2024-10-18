import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutButton } from '@clerk/nextjs';
import { EllipsisVertical } from 'lucide-react';

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
				<DropdownMenuItem>
					<SignOutButton>Log Out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
