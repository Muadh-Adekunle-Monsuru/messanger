import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { FriendData } from './FriendsList';
import Link from 'next/link';

export default function FriendIcon({ friend }: { friend: FriendData }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className='size-8 shrink-0'>
					<Link href={`/chats/${friend.userId}`}>
						<img
							src={friend.imageUrl}
							className='size-8 rounded-full cursor-pointer shrink-0'
						/>
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<p>Chat with {friend.userName}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
