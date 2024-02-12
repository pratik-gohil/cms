// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import articlesData from '../articles.json';
import { categories } from '../categories';

const prisma = new PrismaClient();
// ts-ignore
async function main() {
	console.log(`Start seeding ...`);

	for (const {
		articleTitle,
		articleCategory,
		articleImageSrc,
		articleShortDescription,
		articleHrefURL,
		articlePublishDate,
		articleImageTitle,
		articleImageAlt
	} of articlesData) {
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

					articleContents: '',
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
			});
			console.log(`Created article with id: ${article.id}`);
		} catch (err) {
			console.log(err);
		}
	}
	console.log(`Seeding finished.`);
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
