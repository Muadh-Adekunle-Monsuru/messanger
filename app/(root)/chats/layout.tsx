import ChatList from './components/ChatList';

export default function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='h-screen w-full flex'>
			<ChatList />

			{children}
		</div>
	);
}
