import React from 'react';
import AIHeaderBar from './AIHeaderBar';
import AIBody from './AIBody';

export default function page() {
	return (
		<div className='max-h-screen w-full largesidebar-background flex flex-col items-center blur-[0.3px] overflow-x-hidden overflow-y-hidden relative'>
			<AIHeaderBar />
			<AIBody />
		</div>
	);
}
