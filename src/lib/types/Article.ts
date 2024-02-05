export type ArticleCategory = {
	id: String;
	name: String;
}

export type Article = {
	id: String;
	articleIsActive: boolean;
	articleSortOrder: number;
	articleTitle: string;
	articleCategory: string;
	articleImageSrc: string;
	articleShortDescription: string;
	articlePublishDate: string;
	articleHrefURL: string;
	articleImageTitle: string;
	articleImageAlt: string;
};

export type ArticleWithCategory = Article & {
	articleCategory: ArticleCategory
}