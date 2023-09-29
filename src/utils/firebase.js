// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDocs, collection, addDoc,doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFWBsBcf-hD-gYrk5POk_lKA5gnNYjsIY",
    authDomain: "salesml-c4e6c.firebaseapp.com",
    projectId: "salesml-c4e6c",
    storageBucket: "salesml-c4e6c.appspot.com",
    messagingSenderId: "877852535107",
    appId: "1:877852535107:web:91e7ef77cd94f8a485e7f6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const saveToFirebase = async (data, key) => {
    try {
      const docRef = await addDoc(collection(db, key), data);
      return docRef.id
    } catch (error) {
      console.error("Error saving text to Firestore:", error);
    }
  };

  export const updateFirebase = async ({docID, data}) => {

    try{
      const ref = doc(db, "items", docID);
      await updateDoc(ref, data);
    } catch(error){
      console.error("Error update doc:", error);
    }
  }

  export const deleteFireBase = async (docID) => {
    try{
      await deleteDoc(doc(db, "items", docID));
    }
    catch(error) {
      console.log("error delete doc id",error)
    }
  }

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
      console.error("Error reading data from Firestore:", error);
      return [];
    }
  };