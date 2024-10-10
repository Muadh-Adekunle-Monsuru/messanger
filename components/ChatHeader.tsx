import { EllipsisVertical } from 'lucide-react';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export type friendDataType = {
	userName: string | undefined;
	imageUrl: string | undefined;
};
export default function ChatHeader({
	friendData,
}: {
	friendData?: friendDataType;
}) {
	return (
		<div className='w-full p-3 flex items-center justify-between bg-neutral-50 shadow-sm sticky top-0 left-0 right-0'>
			<div>
				{friendData ? (
					<div className='flex gap-2 items-center'>
						<Image
							src={friendData.imageUrl || ''}
							width={50}
							height={50}
							alt='text'
							className='size-5 rounded-full'
						/>
						<p className='font-medium'>{friendData.userName}</p>
					</div>
				) : (
					<div className='flex gap-2'>
						<Skeleton className='size-5 rounded-full' />
						<Skeleton className='w-[100px] h-[20px] rounded-full' />
					</div>
				)}
			</div>
			<EllipsisVertical className='size-5' />
		</div>
	);
}
