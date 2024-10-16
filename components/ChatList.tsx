'use client';
import AISidebar from '@/app/(root)/chats/ai/AISidebar';
import { api } from '@/convex/_generated/api';
import { formatTime } from '@/lib/server-functions';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { CheckCheck, Image, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ChatListContextMenu from './ContextMenu';

export default function ChatList() {
	const { user } = useUser();
	const chats = useQuery(api.actions.getAllChats, {
		userId: user?.id || '',
	});

	const pathname = usePathname();

	return (
		<div className='h-full flex-1 '>
			<p className='font-semibold text-sm px-3'>Conversations</p>
			{chats?.length == 0 && (
				<p className='text-center text-xs font-medium text-neutral-500 flex items-center gap-1 justify-center pt-5'>
					<MessageSquare className='size-3' />
					Start a conversation
				</p>
			)}
			<div className='h-full overflow-y-auto flex flex-col divide-y scrollbar scrollbar-w-1 scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-thumb-rounded-full '>
				<AISidebar />
				{chats &&
					chats.map((chat) => (
						<ChatListContextMenu
							userId={user?.id}
							friendId={chat.friendUserId}
							key={chat.friendUserId}
						>
							<Link
								href={`/chats/${chat.friendUserId}`}
								className=' last:mb-10 mr-3 rounded-r-sm'
							>
								<div
									className={`w-full p-3 flex items-center gap-2 hover:bg-neutral-100 transition-colors ${pathname == '/chats/' + chat.friendUserId && 'bg-neutral-100'}`}
								>
									<img
										src={chat.friendImageUrl}
										className='size-10 rounded-full cursor-pointer shrink-0'
									/>
									<div className='w-full'>
										<div className='flex items-center justify-between w-full '>
											<p className='font-medium text-lg'>
												{chat.friendUserName}
											</p>
											<div className='flex flex-col items-center'>
												<p className='text-[0.7rem] text-neutral-500 font-thin'>
													{chat.messages.length > 0 &&
														formatTime(
															chat.messages[chat.messages.length - 1].date
														)}
												</p>
												{user &&
													user.id !==
														chat.messages[chat.messages.length - 1].sender &&
													chat.messages.length > 0 &&
													!chat.messages[chat.messages.length - 1].seen && (
														<div
															className={`size-3 rounded-full bg-blue-500 animate-pulse`}
														/>
													)}
											</div>
										</div>
										<div className='font-light text-sm text-muted-foreground flex items-center gap-1'>
											<span
												className={` ${user && chat.messages.length > 0 && user.id !== chat.messages[chat.messages.length - 1].sender && 'hidden'}  ${chat.messages.length == 0 && 'hidden'}`}
											>
												<CheckCheck
													className={`size-4 ${chat.messages.length > 0 && chat.messages[chat.messages.length - 1].seen ? 'text-blue-400' : 'text-neutral-400'}`}
												/>
											</span>
											<span>
												{chat.messages.length > 0 &&
													chat.messages[chat.messages.length - 1].imageUrl && (
														<Image className='size-4' />
													)}
											</span>
											<span className='line-clamp-1'>
												{chat.messages.length > 0 &&
													chat.messages[chat.messages.length - 1].content}
											</span>
										</div>
									</div>
								</div>
							</Link>
						</ChatListContextMenu>
					))}
			</div>
		</div>
	);
}
