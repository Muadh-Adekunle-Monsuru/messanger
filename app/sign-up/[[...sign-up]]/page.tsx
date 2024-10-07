import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
	return (
		<main className='w-full h-screen flex items-center justify-center'>
			<div className='w-full flex items-center justify-center'>
				<SignUp />
			</div>
			<div className='hidden md:flex md:w-full bg-gray-300 h-full'>
				<Image
					src={'/015.webp'}
					alt='bg'
					width={1000}
					height={1000}
					className='w-full h-full object-cover'
				/>
			</div>
		</main>
	);
}
