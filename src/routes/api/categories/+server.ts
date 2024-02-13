import prisma from '$lib/prisma';

export async function GET() {
	const categories = await prisma.category.findMany();

	return new Response(JSON.stringify({ success: true, categories }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
