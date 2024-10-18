import React from 'react';

export default function Blob() {
	return (
		<div className='h-screen w-full absolute top-0 left-0 right-0 -z-10 border-4 flex items-center justify-center'>
			<div className='relative mx-auto my-auto border size-52 blur-2xl -translate-y-6'>
				<div className='size-60 rounded-full bg-gradient-to-bl from-pink-300/20 to-purple-500 absolute top-0 left-0' />
				<div className='size-40 rounded-full bg-gradient-to-l from-orange-300/30 to-blue-500/20 absolute top-0 right-0' />
				<div className='size-80 rounded-full bg-gradient-to-tr from-blue-300/30 to-pink-500/20 absolute top-0 left-0' />
			</div>
		</div>
	);
}
