import {
	EllipsisVertical,
	MessageCircle,
	MessageCirclePlus,
} from 'lucide-react';
import React from 'react';
import SearchBar from './SearchBar';

export default function ChatList() {
	return (
		<div className='h-full w-full md:w-1/3'>
			<div className='p-3 flex flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<h2 className='font-bold text-xl'>Chats</h2>
					<div className='flex gap-3 items-center'>
						<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
							<MessageCirclePlus className='size-5 cursor-pointer hover:text-black text-neutral-700 transition-colors' />
						</div>

						<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
							<EllipsisVertical className='size-5 cursor-pointer' />
						</div>
					</div>
				</div>
				<SearchBar />
			</div>
		</div>
	);
}
