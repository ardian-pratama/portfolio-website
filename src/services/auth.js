import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import { createDocument, getDocument } from './firestore.js';
import { uploadFile } from './storage.js';

const collection = 'users';

export const signUp = async ({ name, email, password, image }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  console.log(user);

  let imageData;
  if (image) {
    const response = await uploadFile(image, `users/${user.uid}`);
    imageData = response;
  }

  await updateProfile(user, { displayName: name, photoURL: imageData.url });
  await createDocument(collection, user.uid, {
    name,
    email,
    image: imageData,
  });

  return user;
};

export const signIn = async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const userData = await getDocument(collection, user.uid);
  return { user, userData };
};

export const logOut = async () => {
  await signOut(auth);
};

export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      getDocument(collection, user.uid).then((userData) => {
        callback({ userData });
      });
    } else {
      callback(null);
    }
  });
};
