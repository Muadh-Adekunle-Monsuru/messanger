import { convexToJson, v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { Id } from './_generated/dataModel';

export const createUser = mutation({
	args: {
		userId: v.string(),
		data: v.object({
			imageUrl: v.string(),
			userName: v.string(),
			email: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		const prevUser = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (prevUser) return;

		await ctx.db.insert('documents', {
			userId: args.userId,
			...args.data,
			chats: [],
		});
	},
});

export const getUserData = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		return user;
	},
});

export const addFriend = mutation({
	args: {
		userId: v.string(),
		friend: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!user) {
			throw new Error();
			return;
		}

		const friend = await ctx.db
			.query('documents')
			.filter((q) =>
				q.or(
					q.eq(q.field('email'), args.friend),
					q.eq(q.field('userName'), args.friend)
				)
			)
			.first();

		if (!friend) throw new Error();

		if (
			user?.friendsList?.find(
				(prevFriend) => prevFriend.userName == friend.userName
			)
		) {
			throw new Error('Friend exists');
		} else {
			if (!!user.friendsList) {
				await ctx.db.patch(user?._id, {
					friendsList: [
						...user.friendsList,
						{
							userName: friend.userName,
							userId: friend.userId,
							imageUrl: friend.imageUrl,
						},
					],
				});
			} else {
				await ctx.db.patch(user?._id, {
					friendsList: [
						{
							userName: friend.userName,
							userId: friend.userId,
							imageUrl: friend.imageUrl,
						},
					],
				});
			}
		}
	},
});

export const getFriends = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!user) return 'no user';
		return { userName: user?.userName, imageUrl: user?.imageUrl };
	},
});

export const sendMessage = mutation({
	args: {
		userId: v.string(),
		data: v.object({
			friendUserName: v.string(),
			friendUserId: v.string(),
			friendImageUrl: v.string(),
			messages: v.object({
				messageId: v.string(),
				content: v.string(),
				sender: v.string(),
				date: v.string(),
				seen: v.boolean(),
				deleted: v.boolean(),
				imageUrl: v.optional(v.string()),
			}),
		}),
	},
	handler: async (ctx, args) => {
		const { friendImageUrl, friendUserId, friendUserName, messages } =
			args.data;
		const user = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!user) return;

		const oldChatIndex = user.chats?.findIndex(
			(chat) => chat.friendUserId == friendUserId
		);

		if (oldChatIndex >= 0) {
			user.chats[oldChatIndex].messages.push(messages);
		} else {
			const newChat = {
				friendUserName,
				friendUserId,
				friendImageUrl,
				messages: [messages],
			};

			user.chats = user.chats ? [...user.chats, newChat] : [newChat];
		}
		await ctx.db.patch(user._id, { chats: user.chats });

		//Updating friends database with the same message

		const friend = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), friendUserId))
			.first();

		if (!friend) return;

		const friendChatIndex = friend.chats?.findIndex(
			(chat) => chat.friendUserId == args.userId
		);

		if (friendChatIndex >= 0) {
			friend.chats[friendChatIndex].messages.push(messages);
		} else {
			const newChat = {
				friendUserName: user.userName,
				friendUserId: user.userId,
				friendImageUrl: user.imageUrl,
				messages: [messages],
			};

			friend.chats = friend.chats ? [...friend.chats, newChat] : [newChat];
		}
		await ctx.db.patch(friend._id, { chats: friend.chats });
	},
});

export const getChat = query({
	args: {
		userId: v.string(),
		friendId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!user) return 'no user';

		const chat = user.chats.find((p) => p.friendUserId == args.friendId);
		if (!chat) return 'no user';
		return chat;
	},
});

export const getAllChats = query({
	args: {
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('documents')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.first();

		if (!user) return;

		return user.chats;
	},
});
