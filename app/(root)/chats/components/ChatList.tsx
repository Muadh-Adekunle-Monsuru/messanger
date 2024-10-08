import {
	EllipsisVertical,
	MessageCircle,
	MessageCirclePlus,
} from 'lucide-react';
import React from 'react';
import SearchBar from './SearchBar';
import AddFriendDialog from '@/components/ui/AddFriendDialog';
import { User } from '@clerk/nextjs/server';
import FriendsList from './FriendsList';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UserButton } from '@clerk/nextjs';

export default function ChatList({ user }: { user: User | undefined | null }) {
	if (!user) return null;
	const userData = useQuery(api.actions.getUserData, { userId: user.id });
	return (
		<div className='h-full w-full md:w-1/3'>
			<div className='p-3 flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<h2 className='font-bold text-xl'>Chats</h2>
					<div className='flex gap-3 items-center'>
						<UserButton />
						<AddFriendDialog userId={user.id} />
						<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
							<EllipsisVertical className='size-5 cursor-pointer' />
						</div>
					</div>
				</div>
				<SearchBar />
				<FriendsList userId={user.id} friendList={userData?.friendsList} />
			</div>
		</div>
	);
}
