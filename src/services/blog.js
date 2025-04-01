import {
  getAllDocuments,
  getDocument,
  getDocumentsByQuery,
} from './firestore.js';

export const getAllBlogs = async () => {
  const blogsData = await getAllDocuments('blogs');

  if (blogsData) {
    const blogsWithAuthors = await Promise.all(
      blogsData.map(async (blog) => {
        const authorData = await getDocument('users', blog.author_id);
        return { author: authorData, ...blog };
      })
    );

    return blogsWithAuthors;
  }

  return blogsData;
};

export const getBlog = async (slug) => {
  const blogData = await getDocumentsByQuery('blogs', 'slug', '==', slug);

  if (blogData) {
    const blogWithAuthor = await Promise.all(
      blogData.map(async (blog) => {
        const authorData = await getDocument('users', blog.author_id);
        return { author: authorData, ...blog };
      })
    );

    return blogWithAuthor;
  }

  return blogData;
};
