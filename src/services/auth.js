import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import { createDocument, getDocument } from './firestore.js';
import { uploadFile } from './storage.js';
import { toast } from 'sonner';

const collection = 'users';
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

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
  return { userData };
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const user = userCredential.user;
  const userData = await getDocument(collection, user.uid);

  if (!userData) {
    await createDocument(collection, user.uid, {
      name: user.displayName,
      email: user.email,
      image: { url: user.photoURL },
    });
    console.log(user);
  }

  toast.message('Success', {
    description: `You have signed in with Google as ${user.displayName}.`,
  });

  return { userData };
};

export const signInWithGithub = async () => {
  const userCredential = await signInWithPopup(auth, githubProvider);
  const user = userCredential.user;
  const userData = await getDocument(collection, user.uid);

  if (!userData) {
    await createDocument(collection, user.uid, {
      name: user.displayName,
      email: user.email,
      image: { url: user.photoURL },
    });
  }

  toast.message('Success', {
    description: `You have signed in with Github as ${user.displayName}.`,
  });

  return { userData };
};

export const logOut = async () => {
  await signOut(auth);
  toast.message('Success', {
    description: 'You have successfully signed out. See you next time.',
  });
};

export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      getDocument(collection, user.uid).then((userData) => {
        if (userData) {
          callback({ userData });
          toast.message('Success', {
            description: `Welcome, ${userData.name}.`,
          });
        }
      });
    } else {
      callback(null);
    }
  });
};
