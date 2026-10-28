import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		order: z.number().int().positive(),
		title: z.string(),
		tagline: z.string(),
		summary: z.string(),
		tags: z.array(z.string()),
		status: z.enum(['In development', 'Complete', 'Discontinued']),
		/** Shown prominently at the top of the case study. */
		notice: z.string().optional(),
		role: z.string().optional(),
		stack: z.array(z.string()).default([]),
		cover: z.enum(['tos', 'relay', 'packetplots', 'lectimate']),
		links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
	}),
});

export const collections = { projects };
