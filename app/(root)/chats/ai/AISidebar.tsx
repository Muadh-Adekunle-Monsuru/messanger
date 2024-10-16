'use client';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AISidebar() {
	const pathname = usePathname();
	return (
		<Link href={`/chats/ai`} className=' rounded-r-sm '>
			<div
				className={`w-full p-3 flex items-center gap-2 bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-colors
                ${pathname == '/chats/ai' && ' bg-gradient-to-r from-pink-50 to-purple-50'}
                `}
			>
				<div className='size-10 rounded-full shrink-0 flex items-center justify-center border bg-gradient-to-tr from-pink-200 to-purple-400'>
					<Sparkles className='size-5' />
				</div>
				<div className='w-full'>
					<div className='flex items-center justify-between w-full '>
						<p className='font-semibold text-sm'>Messanger AI</p>
						<div className='flex flex-col items-center'>
							<p className='text-[0.7rem] text-neutral-500 font-thin'>
								{/* {chat.messages.length > 0 && */}
								{/* formatTime(chat.messages[chat.messages.length - 1].date)} */}
							</p>
						</div>
					</div>
					<div className='font-light text-sm text-muted-foreground flex items-center gap-1'>
						<span className='line-clamp-1'>
							{/* {chat.messages.length > 0 && */}
							{/* chat.messages[chat.messages.length - 1].content} */}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
