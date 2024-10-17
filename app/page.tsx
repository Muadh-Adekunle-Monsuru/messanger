import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex flex-col w-full h-screen items-center justify-center font-[family-name:var(--font-geist-sans)]'>
			<p className='text-7x'>The Chat App</p>

			<Button asChild>
				<Link href={'/chats'}>Chats</Link>
			</Button>
		</div>
	);
}
