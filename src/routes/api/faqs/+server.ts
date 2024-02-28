import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function GET() {
    const faqs = await prisma.faq.findMany({})
    return json({
        success: true, 
        faqs
    })
}