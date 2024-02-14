// prisma/seed.ts

import { PrismaClient, Prisma } from '@prisma/client'
import articlesData from "../articles.json" assert { type: "json" }
import { capitalize } from '../src/lib/utils/common'
import {categories} from '../categories' 

const prisma = new PrismaClient();

const args = process.argv.slice(2, process.argv.length);

async function clearDatabase() {
	const modelKeys = Prisma.dmmf.datamodel.models.map((model) => model.name);

	return Promise.all(modelKeys.map((modelName) => prisma[modelName.toLowerCase()].deleteMany()));
}

if (args.includes('--clear')) {
	console.log(`Found "--clear" argument. Clearing Database before seeding ...`);

	await clearDatabase();

	console.log(`Cleaning complete ...`);
}

async function main() {
	console.log(`Start seeding ...`);

    for (let { articleTitle, articleCategory, articleImageSrc, articleShortDescription,
        articleHrefURL, articlePublishDate, articleImageTitle,
        articleImageAlt } of articlesData) {
        articleCategory = capitalize(articleCategory)
        try {
            const article = await prisma.article.create({
                data: {
                    articleTitle,
                    articleImageSrc,
                    articleShortDescription: articleShortDescription.slice(0, 255),
                    articleHrefURL,
                    articleImageTitle,
                    articleImageAlt,
                    isPublished: true,
                    articlePublishDate: new Date(articlePublishDate),
                    articleContents: "",
                    pageDescription: "",
                    pageTitle: "",
                    redirectionURL: "",
                    articleCategory: {
                        connectOrCreate: {
                            create: {
                                name: articleCategory
                            },
                            where: {
                                name: articleCategory
                            }
                        }
                    },
                    article_identifier: {
                        create: {}
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
async function seedCategories() {
	try {
		const categories_seed = categories.map(async (element) => {
			await prisma.category.create({
				data: {
					...element
				}
			});
			console.log(`Created article with id: ${element.id}`);
		});
	} catch (error) {
		console.log(error);
	}
	
	main()
		.then(async () => {
			await prisma.$disconnect();
		})
		.then(() => seedCategories())
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
