import React from 'react';
import FriendIcon from './FriendIcon';

export type FriendData = {
	userId: string;
	userName: string;
	imageUrl: string;
};
export default function FriendsList({
	friendList,
}: {
	friendList: FriendData[] | undefined;
}) {
	return (
		<div className='px-3'>
			<p className='font-semibold text-sm '>Friends</p>
			<div className='flex w-full gap-3 items-center overflow-x-auto scrollbar scrollbar-h-1 scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-thumb-rounded-full py-2'>
				{friendList?.map((friend) => (
					<FriendIcon friend={friend} key={friend.userId} />
				))}
			</div>
		</div>
	);
}
