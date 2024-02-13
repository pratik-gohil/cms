import type { Article } from "./Article";
import type { ArticleCategory } from "./Category";

export type ArticleWithCategory = Article & {
    articleCategory: ArticleCategory
}

export type ArticleIdentifierWithCategory = {
    id: number,
    articleId: string;
    article: ArticleWithCategory;
};