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
		chats: v.optional(v.array(v.string())),
	}),
});
