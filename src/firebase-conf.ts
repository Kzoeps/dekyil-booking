// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDh7oooJxbJZKf4ReYwVzfaW_ljdexZjjk",
	authDomain: "dekyil-check-in.firebaseapp.com",
	projectId: "dekyil-check-in",
	storageBucket: "dekyil-check-in.appspot.com",
	messagingSenderId: "886740703026",
	appId: "1:886740703026:web:a614cf7f4bfd0c9155292b",
	measurementId: "G-DGE9RWR25T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
