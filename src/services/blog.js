import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { auth, db, storage } from '../lib/firebase.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const writeBlog = async ({
  title,
  description,
  tags,
  user,
  contents,
  links,
  thumbnail,
  images,
}) => {
  const blogRef = doc(collection(db, 'blogs'));

  let dataThumbnail;
  if (thumbnail) {
    const thumbnailRef = ref(
      storage,
      `blogs/${blogRef.id}/thumbnail/${Date.now()}-${thumbnail.name}`
    );

    await uploadBytes(thumbnailRef, thumbnail);

    const src = await getDownloadURL(thumbnailRef);
    dataThumbnail = { src, alt: thumbnail.name, path: thumbnailRef.fullPath };
  }

  let dataImages;
  if (images && images.length > 0) {
    dataImages = await Promise.all(
      images.map(async (image, _) => {
        const imageRef = ref(
          storage,
          `blogs/${blogRef.id}/images/${Date.now()}-${image.name}`
        );

        await uploadBytes(imageRef, image);

        const src = await getDownloadURL(imageRef);

        return { src, alt: image.name, path: imageRef.fullPath };
      })
    );
  }

  await setDoc(blogRef, {
    title,
    description,
    tags,
    user,
    contents,
    links,
    thumbnail: dataThumbnail,
    images: dataImages,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
};

export const readAllBlogs = async () => {
  const blogsRef = collection(db, 'blogs');
  const blogSnapshot = await getDocs(blogsRef);
  const blogsData = blogSnapshot.docs.map(document => ({
    id: document.id,
    ...document.data(),
  }));

  return blogsData;
};

export const readLatestBlogWithLimit = async limitData => {
  const blogRef = collection(db, 'blogs');
  const blogQuery = query(blogRef, orderBy('created_at', 'desc'), limit(limitData));
  const blogSnapshot = await getDocs(blogQuery);
  const blogData = blogSnapshot.docs.map(document => ({
    id: document.id,
    ...document.data(),
  }));

  return blogData;
};

export const readBlogById = async id => {
  const blogsRef = doc(db, 'blogs', id);
  const blogSnapshot = await getDoc(blogsRef);
  const blogData = blogSnapshot.exists() ? blogSnapshot.data() : null;

  return { ...blogData, id: id };
};
