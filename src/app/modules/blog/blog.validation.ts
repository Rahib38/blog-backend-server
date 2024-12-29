import { z } from "zod";

const createBlogValidation=z.object({
    body:z.object({
        title:z.string(),
        content:z.string(),
        // author:z.string()
    })
})
const updateBlogValidation=z.object({
    body:z.object({
        title:z.string().optional(),
        content:z.string().optional(),
        // author:z.string()
    })
})

export const BlogValidation={
    createBlogValidation,updateBlogValidation
}