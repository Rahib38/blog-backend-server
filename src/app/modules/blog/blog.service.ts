import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: TBlog, authorPayload: JwtPayload):Promise<TBlog> => {
  const author = authorPayload._id;

  const createBlog = await Blog.create({ ...payload, author });
  console.log(createBlog);
  const result = await createBlog.populate('author');
  console.log(createBlog);
  return  result ;
};

export const BlogService = {
  createBlog,
};
