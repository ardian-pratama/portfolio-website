import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'sonner';
import { auth, db, storage } from '../lib/firebase.js';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signUp = async ({ name, email, password, image }) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  let imageData;
  if (image) {
    const imageRef = ref(
      storage,
      `users/${user.uid}/${Date.now()}-${image.name}`
    );

    await uploadBytes(imageRef, image);

    const src = await getDownloadURL(imageRef);
    imageData = { src, alt: name, path: imageRef.fullPath };
  }

  await updateProfile(user, { displayName: name, photoURL: imageData.src });

  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, {
    name,
    email,
    provider_id: user.providerData[0].providerId,
    image: imageData,
    created_at: Date.now(),
    updated_at: Date.now(),
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
  const userRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userRef);
  const userData = userSnapshot.exists() ? userSnapshot.data() : null;

  return userData;
};

export const signInWithGoogle = async () => {
  try {
    googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.exists() ? userSnapshot.data() : null;

    if (!userData) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.providerData[0].email,
        provider_id: user.providerData[0].providerId,
        image: { src: user.photoURL, alt: user.displayName },
        created_at: Date.now(),
        updated_at: Date.now(),
      });
    }

    toast.message('Success', {
      description: `You have signed in with Google as ${user.displayName}.`,
    });

    return user;
  } catch {
    toast.message('Error', {
      description: 'An unexpected error occurred. Please try again.',
    });
  }
};

export const signInWithGithub = async () => {
  try {
    const userCredential = await signInWithPopup(auth, githubProvider);
    const user = userCredential.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.exists() ? userSnapshot.data() : null;

    if (!userData) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.providerData[0].email,
        provider_id: user.providerData[0].providerId,
        image: { src: user.photoURL, alt: user.displayName },
        created_at: Date.now(),
        updated_at: Date.now(),
      });
    }

    toast.message('Success', {
      description: `You have signed in with Github as ${user.displayName}.`,
    });

    return user;
  } catch {
    toast.message('Error', {
      description: 'An unexpected error occurred. Please try again.',
    });
  }
};

export const logOut = async () => {
  await signOut(auth);
  toast.message('Success', {
    description: 'You have successfully signed out. See you next time.',
  });
};

export const authStateListener = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userData = await getDoc(userRef);
      if (userData.exists()) {
        callback({ id: userData.id, ...userData.data() });
        toast.message('Success', {
          description: `Welcome, ${userData.data().name}.`,
        });
      }
    } else {
      callback(null);
    }
  });
};
