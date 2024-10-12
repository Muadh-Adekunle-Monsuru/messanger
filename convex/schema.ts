import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	documents: defineTable({
		userId: v.string(),
		email: v.string(),
		imageUrl: v.string(),
		userName: v.string(),
		friendsList: v.optional(
			v.array(
				v.object({
					userId: v.string(),
					userName: v.string(),
					imageUrl: v.string(),
				})
			)
		),
		chats: v.array(
			v.object({
				friendUserName: v.string(),
				friendUserId: v.string(),
				friendImageUrl: v.string(),
				messages: v.array(
					v.object({
						messageId: v.string(),
						content: v.string(),
						sender: v.string(),
						date: v.string(),
						seen: v.boolean(),
						deleted: v.boolean(),
						imageUrl: v.optional(v.string()),
						starred: v.optional(v.boolean()),
						emoji: v.optional(v.string()),
					})
				),
			})
		),
	}),
});
