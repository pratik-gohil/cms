import prisma from '$lib/prisma';
import { text } from '@sveltejs/kit';

export async function GET() {
	const categories = await prisma.category.findMany();

	return new Response(JSON.stringify({ success: true, categories }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// This handler will respond to PUT, PATCH, DELETE, etc.
/** @type {import('./$types').RequestHandler} */
export async function fallback({ request }) {
	return text(`I caught your ${request.method} request!`);
}
