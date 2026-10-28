import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Language-independent facts about a project, one YAML file each. */
const projects = defineCollection({
	loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
	schema: z.object({
		order: z.number().int().positive(),
		status: z.enum(['active', 'complete', 'discontinued']),
		cover: z.enum(['tos', 'relay', 'packetplots', 'lectimate']),
		links: z.array(z.object({ kind: z.enum(['source']), href: z.url() })).default([]),
	}),
});

/** The write-up for a project in one language: writeups/<lang>/<project>.md */
const writeups = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		summary: z.string(),
		/** Shown prominently at the top of the case study. */
		notice: z.string().optional(),
		tags: z.array(z.string()),
		role: z.string().optional(),
		stack: z.array(z.string()).default([]),
	}),
});

export const collections = { projects, writeups };
