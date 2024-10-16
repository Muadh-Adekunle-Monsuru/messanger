'use client';
import React from 'react';
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import { Sparkles } from 'lucide-react';
export default function AIBody() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();
	return (
		<div className='flex flex-col h-full relative  w-full max-w-xl mx-auto'>
			{messages.length == 0 ? (
				<div className='my-auto mx-auto flex flex-col gap-3 items-center justify-center'>
					<Sparkles className='size-6' />
					<p className='text-3xl font-semibold'>Start A New Chat Session</p>
					<p className='text-center underline underline-offset-8 text-lg'>
						Ask anything
					</p>
				</div>
			) : (
				<div className='overflow-y-auto h-full max-h-96 my-auto scrollbar scrollbar-w-1 scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-thumb-rounded-full flex flex-col divide-y gap-3 backdrop-blur-sm'>
					{messages.map((m) => (
						<div key={m.id} className='py-3'>
							<p className={`${m.role == 'user' && 'font-bold'}`}>
								<ReactMarkdown className='prose rounded-lg'>
									{m.content}
								</ReactMarkdown>
							</p>
						</div>
					))}
				</div>
			)}

			<form onSubmit={handleSubmit} className='absolute bottom-0 w-full'>
				<input
					className=' w-full p-2 mb-8 border border-gray-300 rounded-full shadow-xl'
					value={input}
					placeholder='Ask something...'
					onChange={handleInputChange}
				/>
			</form>
		</div>
	);
}
