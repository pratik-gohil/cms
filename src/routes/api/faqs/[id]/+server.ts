import prisma from "$lib/prisma";
import { json, type ServerLoadEvent } from "@sveltejs/kit";

export async function GET({ params,request }: ServerLoadEvent) { 
    const faq = await prisma.faq.findUnique({
        where: {
            id:params.id
        },
        include: {
            category: {
                select: {
                name: true
            }
            }
        }
    })
    return json({
        success: true,
        faq : faq
    })
}