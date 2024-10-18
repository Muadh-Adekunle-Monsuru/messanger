import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Blob from './Blob';
import Image from 'next/image';
import Doodles from './Doodles';
import { MoveRight } from 'lucide-react';

export default function Home() {
	return (
		<div className='bg-noise bg-repeat flex flex-col w-full h-screen items-center justify-center font-[family-name:var(--font-geist-sans)] overflow-hidden'>
			<Blob />
			<Doodles />
			<div className='absolute top-0 left-0 right-0  flex items-center justify-center py-5'>
				<div className='flex items-center gap-2 select-none blur-[3px]]'>
					<Image src={'/logo-dark.svg'} alt='logo' width={30} height={30} />
					<p className='text-lg font-black'>Messenger</p>
				</div>
			</div>
			<h1 className='text-7xl font-black max-w-xl text-center font-[family-name:var(--font-londrina)]'>
				Talk. Share. Connect.
			</h1>
			<p className='text-lg max-w-md text-center py-4 leading-none font-medium text-neutral-600 p-2'>
				Never miss a moment. Instantly reach out, share memories, and keep your
				conversations going with just a tap.
			</p>

			<div className='p-3 px-5 bg-neutral-100 shadow-lg rounded-md  font-[family-name:var(--font-londrina)] absolute top-1/4 left-32 rotate-12 select-none hover:shadow-xl'>
				<p className='font-bold'>Speedy</p>
			</div>
			<div className='p-3 px-5 bg-neutral-100 shadow-lg rounded-md  font-[family-name:var(--font-londrina)] absolute top-1/3 right-52 -rotate-12 select-none hover:shadow-xl'>
				<p className='font-bold'>Secure</p>
			</div>
			<div className='p-3 px-5 bg-neutral-100 shadow-lg rounded-md  font-[family-name:var(--font-londrina)] absolute bottom-1/4 left-32 rotate-1 select-none hover:shadow-xl'>
				<p className='font-semibold'>Simple</p>
			</div>
			<Button
				asChild
				variant='outline'
				className='mt-4 hover:bg-blue-100 transition-colors hover:shadow-xl'
			>
				<Link href={'/chats'}>Start a Conversation</Link>
			</Button>
		</div>
	);
}
