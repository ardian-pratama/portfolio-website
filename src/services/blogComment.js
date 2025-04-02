import {
  onValue,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';
import { rtdb } from '../lib/firebase.js';

export const writeBlogComment = async ({ blog_id, user, comment }) => {
  const commentRef = ref(rtdb, `blogs/${blog_id}/comments`);
  const newCommentRef = push(commentRef);

  await set(newCommentRef, {
    user,
    comment,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
};

export const readBlogComments = (blog_id, callback) => {
  const commentRef = query(
    ref(rtdb, `blogs/${blog_id}/comments`),
    orderByChild('created_at')
  );

  return onValue(commentRef, async (snapshot) => {
    if (snapshot.val()) {
      const comments = snapshot.val();
      const commentData = Object.entries(comments).map(([id, comment]) => ({
        id,
        ...comment,
      }));

      callback(commentData);
    } else {
      callback([]);
    }
  });
};

export const deleteBlogComment = async (blog_id, id) => {
  const commentRef = ref(rtdb, `blogs/${blog_id}/comments/${id}`);
  console.log('delete');

  await remove(commentRef);
};
