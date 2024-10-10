import { Search } from 'lucide-react';
import React from 'react';

export default function SearchBar() {
	return (
		<div className='w-full px-3'>
			<div className='w-full relative'>
				<input
					className='w-full pl-8 p-1 bg-neutral-100 rounded-md focus:outline-1 outline-neutral-300'
					placeholder='Search'
				/>
				<Search className='size-4 absolute left-2 top-2 text-neutral-500' />
			</div>
		</div>
	);
}
