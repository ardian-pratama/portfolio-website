import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase.js';

export const createDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, {
    ...data,
    created_at: new Date(),
    updated_at: new Date(),
  });
};

export const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
};

export const getLatestDocuments = async (collectionName, limitData) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = query(
    collectionRef,
    orderBy('created_at', 'desc'),
    limit(limitData)
  );
  const snapshot = await getDocs(querySnapshot);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const getDocumentsByQuery = async (
  collectionName,
  fieldName,
  condition,
  fieldValue
) => {
  const collectionRef = collection(db, collectionName);
  const querySnapshot = query(
    collectionRef,
    where(fieldName, condition, fieldValue)
  );
  const snapshot = await getDocs(querySnapshot);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const getAllDocuments = async (collectionName) => {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updated_at: new Date() });
};

export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};
