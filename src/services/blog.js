import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../lib/firebase.js';

export const readAllBlogs = async () => {
  const blogsRef = collection(db, 'blogs');
  const blogSnapshot = await getDocs(blogsRef);
  const blogsData = blogSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (blogsData) {
    const blogsDataWithUser = await Promise.all(
      blogsData.map(async (blog) => {
        const userRef = doc(db, 'users', blog.user_id);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.exists() ? userSnapshot.data() : null;

        return { user: userData, ...blog };
      })
    );

    return blogsDataWithUser;
  }

  return blogsData;
};

export const readLatestBlogWithLimit = async (limitData) => {
  const blogRef = collection(db, 'blogs');
  const blogQuery = query(
    blogRef,
    orderBy('created_at', 'desc'),
    limit(limitData)
  );
  const blogSnapshot = await getDocs(blogQuery);
  const blogData = blogSnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));

  if (blogData) {
    const blogDataWithUser = await Promise.all(
      blogData.map(async (blog) => {
        const userRef = doc(db, 'users', blog.user_id);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.exists() ? userSnapshot.data() : null;

        return { user: userData, ...blog };
      })
    );

    return blogDataWithUser;
  }

  return blogData;
};

export const readBlogById = async (id) => {
  const blogsRef = doc(db, 'blogs', id);
  const blogSnapshot = await getDoc(blogsRef);
  const blogData = blogSnapshot.exists() ? blogSnapshot.data() : null;

  if (blogData) {
    const userRef = doc(db, 'users', blogData.user_id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.exists() ? userSnapshot.data() : null;

    return { user: userData, id: blogSnapshot.id, ...blogData };
  }

  return blogData;
};
