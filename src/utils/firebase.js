// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveToFirebase = async (data, key) => {
  try {
    const docRef = await addDoc(collection(db, key), data);
    return docRef.id;
  } catch (error) {
    console.error('Error saving text to Firestore:', error);
  }
};

export const updateFirebase = async ({ docID, data }) => {
  try {
    const ref = doc(db, 'items', docID);
    await updateDoc(ref, data);
  } catch (error) {
    console.error('Error update doc:', error);
  }
};

export const deleteFireBase = async (docID) => {
  try {
    await deleteDoc(doc(db, 'items', docID));
  } catch (error) {
    console.log('error delete doc id', error);
  }
};

export const readFirebase = async (collectionName) => {
  try {
    const userTextsCollection = collection(db, collectionName);
    const querySnapshot = await getDocs(userTextsCollection);

    const documentData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return documentData;
  } catch (error) {
    console.error('Error reading data from Firestore:', error);
    return [];
  }
};
