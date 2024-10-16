import { EllipsisVertical } from 'lucide-react';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import ChatBodyMenu from './ChatBodyMenu';

export type friendDataType = {
	userName: string | undefined;
	imageUrl: string | undefined;
	userId: string | undefined;
	isOnline?: boolean | undefined;
};
export default function ChatHeader({
	friendData,
	userId,
	isTyping,
}: {
	friendData?: friendDataType | undefined;
	userId?: string | null;
	isTyping?: boolean | undefined;
}) {
	return (
		<div className='w-full p-3 flex items-center justify-between bg-neutral-50 shadow-sm sticky top-0 left-0 right-0 z-40'>
			<div>
				{friendData ? (
					<div className='flex gap-2 items-center'>
						<Image
							src={friendData.imageUrl || ''}
							width={50}
							height={50}
							alt='text'
							className='size-6 rounded-full'
						/>
						<div className='flex flex-col'>
							<p className='font-medium'>{friendData.userName}</p>
							<p className='text-[0.6rem] text-muted-foreground'>
								{friendData.isOnline && 'online'}
							</p>
						</div>
					</div>
				) : (
					<div className='flex gap-2'>
						<Skeleton className='size-5 rounded-full' />
						<Skeleton className='w-[100px] h-[20px] rounded-full' />
					</div>
				)}
			</div>
			<ChatBodyMenu userId={userId} friendId={friendData?.userId} />
		</div>
	);
}
