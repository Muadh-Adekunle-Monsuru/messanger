import { v } from 'convex/values';
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
