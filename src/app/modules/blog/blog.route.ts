import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidation } from "./blog.validation";
import { BlogController } from "./blog.controller";
import auth from "../../middlewares/auth";

const blogRouter = Router()

blogRouter.post('/',auth('admin','user'), validateRequest(BlogValidation.createBlogValidation),BlogController.createBlog)
blogRouter.patch('/:id',auth("user","admin"),validateRequest(BlogValidation.updateBlogValidation),BlogController.updateBlog)

export default blogRouter