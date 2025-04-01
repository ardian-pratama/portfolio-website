import { getAllDocuments, getDocument } from './firestore.js';

export const getAllBlogs = async () => {
  const blogsData = await getAllDocuments('blogs');
  if (blogsData) {
    blogsData.map(async (blog) => {
      const authorData = await getDocument('users', blog.author_id);

      return { ...blogsData, author: authorData };
    });
  }

  return blogsData;
};
