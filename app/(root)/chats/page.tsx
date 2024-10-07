import { LockOpen } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function Page() {
	return (
		<div className='h-full w-full largesidebar-background flex flex-col gap-4 items-center justify-center relative blur-[0.3px]'>
			<Image
				src={'/logo-dark.svg'}
				alt='logo dark'
				width={100}
				height={100}
				className='size-20'
			/>
			<p className='font-bold text-3xl'>Your World in One Chat</p>
			<p className='max-w-lg text-center text-sm font-light text-neutral-700'>
				Experience seamless messaging with real-time connections. Wherever you
				are, whoever you're with, stay close with instant communication at your
				fingertips.
			</p>

			<div className='absolute bottom-5 w-full left-0 right-0'>
				<div className=' text-center w-fit flex gap-1 items-center text-xs mx-auto '>
					<span>
						<LockOpen className='size-3' />
					</span>
					<span>Your messages are not end-to-end encrypted</span>
				</div>
			</div>
		</div>
	);
}
