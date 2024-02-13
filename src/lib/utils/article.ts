import type { Prisma } from "@prisma/client";
import { slugify } from "./common";

export const retriveArticleData = (formData: FormData) => {
    let data: Prisma.articleCreateInput & { articleImage?: File, articleCategoryId?: string, __superform_id?: string, publish?: boolean } = {
        articleContents: "",
        articleTitle: "",
        articleImageSrc: "",
        articleHrefURL: "",
        articleImageAlt: "",
        articleImageTitle: "",
        articleShortDescription: "",
        isPublished: false
    };

    formData.forEach((value, key) => {
        // @ts-ignore
        data[key] = key === "publish" ? JSON.parse(value) : value
    });

    data = {
        ...data,
        articleHrefURL: slugify(data.articleTitle),
        articleImageSrc: data.articleImage?.name || ""
    }

    return data
}