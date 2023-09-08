// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDX-BaSa80-BmPaFxpBXNn_q_9K_a9XFHQ',
	authDomain: 'swiggy-clone-7b5a6.firebaseapp.com',
	projectId: 'swiggy-clone-7b5a6',
	storageBucket: 'swiggy-clone-7b5a6.appspot.com',
	messagingSenderId: '12659765570',
	appId: '1:12659765570:web:d868edd32da48ef42c18db',
	measurementId: 'G-9WYFS40J8T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
