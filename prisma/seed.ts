// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import articlesData from "../articles.json" assert { type: "json" }

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)

    for (const { articleTitle, articleCategory, articleImageSrc, articleShortDescription, articleHrefURL, articlePublishDate, articleImageTitle, articleImageAlt } of articlesData) {
        try {
            const article = await prisma.article.create({
                data: {
                    articleTitle,
                    articleImageSrc,
                    articleShortDescription: articleShortDescription.slice(0, 255),
                    articleHrefURL,
                    articleImageTitle,
                    articleImageAlt,
                    articleIsActive: true,
                    articlePublishDate: new Date(articlePublishDate),
                    articleContents: "",
                    articleCategory: {
                        connectOrCreate: {
                            create: {
                                name: articleCategory
                            },
                            where: {
                                name: articleCategory
                            }
                        }
                    }
                }
            })
            console.log(`Created article with id: ${article.id}`)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })