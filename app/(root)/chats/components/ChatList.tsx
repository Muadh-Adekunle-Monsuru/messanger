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

export default function ChatList({ user }: { user: User | undefined | null }) {
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

					<Skeleton className='w-[100px] h-[20px] rounded-full' />
					<Skeleton className='w-full h-[20px] rounded-full' />
					<Skeleton className='w-full h-[20px] rounded-full' />
					<Skeleton className='w-[300px] h-[20px] rounded-full' />
					<Skeleton className='w-[500px] h-[20px] rounded-full' />
				</div>
			</div>
		);
	const userData = useQuery(api.actions.getUserData, { userId: user.id });
	return (
		<div className='h-full w-full md:w-1/3'>
			<div className='p-3 flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<h2 className='font-bold text-xl'>Chats</h2>
					<div className='flex gap-3 items-center'>
						<AddFriendDialog userId={user.id} />
						<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
							<EllipsisVertical className='size-5 cursor-pointer' />
						</div>
					</div>
				</div>
				<SearchBar />
				<FriendsList userId={user.id} friendList={userData?.friendsList} />
				<p className='text-center font-medium text-neutral-500 flex items-center gap-1 justify-center'>
					<MessageSquare className='size-5' />
					Start a conversation
				</p>
			</div>
		</div>
	);
}
