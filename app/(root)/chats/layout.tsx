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
	const setOnline = useMutation(api.actions.setOnline);
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
			setOnline({ userId: user.id });
		}
	}, [isLoaded, isSignedIn, user, setOnline, createUser]);

	useEffect(() => {
		const handleClose = () => {
			if (!user?.id) return;
			const payload = JSON.stringify(user.id);
			const url = 'https://calculating-alpaca-828.convex.site/setOffline';

			navigator.sendBeacon(url, payload);
		};

		window.addEventListener('beforeunload', handleClose);

		return () => {
			window.removeEventListener('beforeunload', handleClose);
		};
	}, [user?.id]);
	return (
		<div className='h-screen max-h-[100dvh] overflow-hidden w-full flex'>
			<Sidebar user={user as unknown as User} />
			{children}
		</div>
	);
}
