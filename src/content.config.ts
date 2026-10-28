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
		role: z.string(),
		status: z.string(),
		stack: z.array(z.string()),
		cover: z.enum(['tos', 'packetplots', 'school']),
		links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
	}),
});

export const collections = { projects };
