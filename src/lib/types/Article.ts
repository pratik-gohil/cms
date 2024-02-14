export type ArticleCategory = {
	id: String;
	name: String;
};

export type Article = {
	id: String;
	isPublished: boolean;
	articleContents: string;
	articleTitle: string;
	articleImageSrc: string;
	articleShortDescription: string;
	articlePublishDate: string;
	articleHrefURL: string;
	articleImageTitle: string;
	articleImageAlt: string;
	createdAt: Date;
	updatedAt: Date;
};

export type ArticleIdentifier = {
	id: number;
	articleId: string;
	article: Article;
};
