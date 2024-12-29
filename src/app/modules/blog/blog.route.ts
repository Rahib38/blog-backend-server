import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";

const blogRouter = Router()

blogRouter.post('/blogs',auth('admin','user'), validateRequest(BlogValidation.createBlogValidation),BlogController.createBlog)

export default blogRouter