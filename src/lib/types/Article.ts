export type ArticleCategory = {
	id: String;
	name: String;
}

export type Article = {
	id: String;
	articleIsActive: boolean;
	articleSortOrder: number;
	articleContents: string;
	articleTitle: string;
	articleCategory: string;
	articleImageSrc: string;
	articleShortDescription: string;
	articlePublishDate: string;
	articleHrefURL: string;
	articleImageTitle: string;
	articleImageAlt: string;

	createdAt: Date,
	updatedAt: Date,
};

export type ArticleWithCategory = Article & {
	articleCategory: ArticleCategory
}

export type ArticleIdentifier = {
	id: number,
	articleId: string;
	article: Article;
}

export type ArticleIdentifierWithCategory = {
	id: number,
	articleId: string;
	article: ArticleWithCategory;
};