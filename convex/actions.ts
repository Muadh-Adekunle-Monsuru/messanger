import { v } from 'convex/values';
import { query, mutation } from './_generated/server';
import { Id } from './_generated/dataModel';

export const createTask = mutation({
	args: {
		userId: v.string(),
		data: v.array(
			v.object({
				content: v.string(),
				description: v.optional(v.string()),
				priority: v.optional(v.string()),
				indent: v.optional(v.string()),
				dueDate: v.optional(v.string()),
				label: v.optional(v.array(v.string())),
				createdDate: v.string(),
				taskId: v.string(),
			})
		),
		labels: v.optional(v.array(v.string())),
	},
	handler: async (ctx, args) => {},
});
