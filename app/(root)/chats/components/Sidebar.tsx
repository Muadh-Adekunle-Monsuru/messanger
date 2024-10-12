import {
	EllipsisVertical,
	MessageCircle,
	MessageCirclePlus,
	MessageSquare,
} from 'lucide-react';
import React from 'react';
import SearchBar from './SearchBar';
import AddFriendDialog from '@/components/ui/AddFriendDialog';
import { User } from '@clerk/nextjs/server';
import FriendsList from './FriendsList';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserButton } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import ChatList from '@/components/ChatList';
import SidebarMenu from '@/components/SidebarMenu';

export default function Sidebar({ user }: { user: User | undefined | null }) {
	if (!user)
		return (
			<div className='h-full w-full md:w-1/3'>
				<div className='p-3 flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<h2 className='font-bold text-xl'>Chats</h2>
						<div className='flex gap-3 items-center'>
							<Skeleton className='w-[100px] h-[20px] rounded-full' />
							<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
								<EllipsisVertical className='size-5 cursor-pointer' />
							</div>
						</div>
					</div>

					<Skeleton className='w-1/2 h-[20px] rounded-full' />
					<Skeleton className='w-full h-[20px] rounded-full' />
					<Skeleton className='w-full h-[20px] rounded-full' />
					<Skeleton className='w-2/3 h-[20px] rounded-full' />
					<Skeleton className='w-1/4 h-[20px] rounded-full' />
				</div>
			</div>
		);
	const userData = useQuery(api.actions.getUserData, { userId: user.id });
	return (
		<div className='h-full max-h-screen w-full md:w-1/3 '>
			<div className='h-full py-3 flex flex-col gap-4'>
				<div className='px-3 flex items-center justify-between'>
					<h2 className='font-bold text-xl'>Chats</h2>
					<div className='flex gap-3 items-center'>
						<AddFriendDialog userId={user.id} />
						<SidebarMenu />
					</div>
				</div>
				<SearchBar />
				<FriendsList userId={user.id} friendList={userData?.friendsList} />
				<ChatList />
			</div>
		</div>
	);
}
