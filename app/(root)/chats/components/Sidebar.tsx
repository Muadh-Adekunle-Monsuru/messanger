'use client';
import ChatList from '@/components/ChatList';
import SidebarMenu from '@/components/SidebarMenu';
import AddFriendDialog from '@/components/ui/AddFriendDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { User } from '@clerk/nextjs/server';
import { useQuery } from 'convex/react';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FriendsList from './FriendsList';

export default function Sidebar({ user }: { user: User | undefined | null }) {
	const pathname = usePathname();
	const userData = useQuery(api.actions.getUserData, {
		userId: user?.id || '',
	});
	if (!user)
		return (
			<div
				className={`h-full w-full md:w-1/3 ${pathname !== '/chats' && 'hidden md:flex'}`}
			>
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
	return (
		<div
			className={`h-full max-h-screen w-full md:w-1/3 ${pathname !== '/chats' && 'hidden md:flex'}`}
		>
			<div className='h-full py-3 flex flex-col gap-4 w-full'>
				<div className='px-3 flex items-center justify-between'>
					<h2 className='font-bold text-xl'>
						<Link href={'/chats'}>Chats </Link>
					</h2>
					<div className='flex gap-3 items-center'>
						<AddFriendDialog userId={user.id} />
						<SidebarMenu />
					</div>
				</div>
				{/* <SearchBar /> */}
				<FriendsList friendList={userData?.friendsList} />
				<ChatList />
			</div>
		</div>
	);
}
