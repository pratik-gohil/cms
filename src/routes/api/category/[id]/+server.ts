import prisma from '$lib/prisma';
import { text } from '@sveltejs/kit';

export async function GET(e) {
	const category = await prisma.category.findUnique({
		where: {
			id: e.params?.id
		}
	});
	return new Response(JSON.stringify({ success: true, category }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
