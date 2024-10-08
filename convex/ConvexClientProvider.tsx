'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(
	'https://calculating-alpaca-828.convex.cloud'
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
