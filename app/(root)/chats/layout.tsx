'use client';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { User } from '@clerk/nextjs/server';
import Sidebar from './components/Sidebar';

export default function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isLoaded, isSignedIn, user } = useUser();
	const createUser = useMutation(api.actions.createUser);
	useEffect(() => {
		if (isLoaded && isSignedIn) {
			createUser({
				userId: user.id,
				data: {
					email: user.emailAddresses[0].emailAddress,
					userName: user.username ?? '',
					imageUrl: user.imageUrl,
				},
			});
		}
	}, [isLoaded, isSignedIn, user]);
	return (
		<div className='h-screen max-h-screen overflow-hidden w-full flex'>
			<Sidebar user={user as unknown as User} />
			{children}
		</div>
	);
}
