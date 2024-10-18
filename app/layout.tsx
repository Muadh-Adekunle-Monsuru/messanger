import { Toaster } from '@/components/ui/toaster';
import { ConvexClientProvider } from '@/convex/ConvexClientProvider';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Londrina_Sketch } from 'next/font/google';
const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});
const londrina = Londrina_Sketch({
	weight: '400',
	variable: '--font-londrina',
	subsets: ['latin'],
});
export const metadata: Metadata = {
	title: 'Messenger',
	description: 'Seamless messaging, effortless connections.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} ${londrina.variable} antialiased`}
				>
					<ConvexClientProvider>{children}</ConvexClientProvider> <Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
