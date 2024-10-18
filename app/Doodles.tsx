'use client';
import React, { useEffect, useState } from 'react';

export default function Doodles() {
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setScreenSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			};

			// Set initial size
			handleResize();

			// Add event listener for window resize
			window.addEventListener('resize', handleResize);

			// Cleanup event listener on unmount
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, []);
	return (
		<div className='h-screen w-full absolute top-0 left-0 right-0 -z-10 border-4 flex items-center justify-center overflow-hidden blur-[1px]'>
			{[1, 2, 3, 6].map((number, index) => {
				const top = Math.random() * (screenSize.height - 40); // Adjust for image height
				const left = Math.random() * (screenSize.width - 40);

				return (
					<img
						src={`/doodles/${number}.svg`}
						key={index}
						className='size-20 brightness-50'
						style={{
							top: `${top}px`,
							left: `${left}px`,
							position: 'absolute',
						}}
					/>
				);
			})}
		</div>
	);
}
