import React from 'react';
import { Input } from './ui/input';
import { Plus, SendHorizonal, Smile } from 'lucide-react';

export default function ChatInputBar() {
	return (
		<div className='w-full  bg-neutral-100 shadow-sm fixed bottom-0 left-0 right-0'>
			<div className='p-3 flex items-center justify-between gap-2'>
				<Smile className='size-6 text-neutral-500 cursor-pointer' />
				<Plus className='size-6 text-neutral-500 cursor-pointer' />
				<input
					placeholder='Type a message'
					className='w-full focus:outline-none p-2 border rounded-md'
				/>
				<SendHorizonal className='size-6 text-neutral-500 cursor-pointer' />
			</div>
		</div>
	);
}
