import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../lib/firebase.js';

export const uploadFile = async (file, path) => {
  if (!file) {
    throw new Error('No file provided');
  }

  const uniqueFileName = `${Date.now()}-${file.name}`;
  const fileRef = ref(storage, `${path}/${uniqueFileName}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return { url, path: fileRef.fullPath };
};

export const getFileURL = async (filePath) => {
  if (!filePath) {
    throw new Error('No file path provided');
  }

  const fileRef = ref(storage, filePath);
  return await getDownloadURL(fileRef);
};

export const updateFile = async (newFile, oldFilePath) => {
  if (!newFile) {
    throw new Error('No new file provided');
  }

  if (oldFilePath) {
    try {
      await deleteFile(oldFilePath);
    } catch (error) {
      throw new Error('Failed to delete old file: ', error.message);
    }
  }

  return await uploadFile(newFile, oldFilePath.split('/')[0]);
};

export const deleteFile = async (filePath) => {
  if (!filePath) {
    throw new Error('No file path provided');
  }

  const fileRef = ref(storage, filePath);
  await deleteObject(fileRef);
};
