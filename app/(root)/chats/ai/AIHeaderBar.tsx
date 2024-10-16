import { ChevronLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function AIHeaderBar() {
	return (
		<div className='w-full p-3 flex items-center justify-between bg-neutral-50 shadow-sm fixed top-0 left-0 right-0 z-40'>
			<div>
				<div className='flex gap-2 items-center'>
					<Link href={'/chats'} className='p-1 md:hidden'>
						<ChevronLeft className='size-5' />
					</Link>
					<div className='size-8 rounded-full shrink-0 flex items-center justify-center border bg-gradient-to-tr from-pink-200 to-purple-400'>
						<Sparkles className='size-4' />
					</div>
					<div className='flex flex-col'>
						<p className='font-medium'>Messenger AI</p>
						<p className='text-[0.6rem] text-muted-foreground'>online</p>
					</div>
				</div>
			</div>
		</div>
	);
}
