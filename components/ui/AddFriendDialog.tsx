'use client';
import React, { FormEvent, FormEventHandler, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { MessageCirclePlus } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useToast } from '@/hooks/use-toast';

export default function AddFriendDialog({ userId }: { userId: string }) {
	const { toast } = useToast();
	const [friend, setFriend] = useState('');
	const addFriend = useMutation(api.actions.addFriend);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!friend) return;
		try {
			await addFriend({ userId, friend });
			toast({
				title: 'Friend Added 🎉',
			});
		} catch (e) {
			toast({
				title: `⚠️ Unable to add friend`,
				description:
					'Ensure the username/email is correct, and is a valid Messenger user.',
			});
		}
		setFriend('');
	};
	return (
		<Dialog>
			<DialogTrigger>
				<div className='p-1 hover:bg-neutral-200 transition-colors rounded-md cursor-pointer'>
					<MessageCirclePlus className='size-5 cursor-pointer hover:text-black text-neutral-700 transition-colors' />
				</div>
			</DialogTrigger>
			<DialogContent className='max-w-sm'>
				<DialogHeader>
					<DialogTitle>Add a friend</DialogTitle>
					<DialogDescription>
						Enter your friend's Username or Email
					</DialogDescription>
				</DialogHeader>
				<form
					className='flex gap-2 items-center justify-center'
					onSubmit={handleSubmit}
				>
					<Input
						placeholder='Username or Email'
						value={friend}
						onChange={(e) => setFriend(e.target.value)}
					/>

					<Button type='submit'>Add</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
