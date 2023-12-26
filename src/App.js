import logo from './logo.svg';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, deleteUser, getAuth, reauthenticateWithCredential, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from 'react';

import { BounceLoader } from 'react-spinners';

function App() {
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const [webState, setWebState] = useState(0);
const [token, setToken] = useState(null);
const [user, setUser] = useState(null);
const [credentials, setCredentials] = useState(null);

const firebaseConfig = {
  apiKey: "AIzaSyAI3MH8EVdM7B-7dTNW9kfoeUsH7xduRPQ",
  authDomain: "complaintticketingsystem.firebaseapp.com",
  databaseURL: "https://complaintticketingsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "complaintticketingsystem",
  storageBucket: "complaintticketingsystem.appspot.com",
  messagingSenderId: "72424882312",
  appId: "1:72424882312:web:72fbe7c29c89f272901f3d",
  measurementId: "G-W0KG7J9R9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider =  new GoogleAuthProvider();

const signIn = async () => {
  await signInWithPopup(auth, provider)
  .then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    setCredentials(GoogleAuthProvider.credentialFromResult(result));
    
    setUser(result.user)
  })
  .catch(error => {
    console.log(error)
  });
}

useEffect(() =>{
  signIn();
},[]);



useEffect(()=>{
  if(credentials){
    setToken(credentials.accessToken);
    // The signed-in user info.
  }

  if(credentials && token && user ){
    setWebState(1);
  }


},[credentials, token, user, webState])

const handleDelete = () => {
 
  signInWithPopup(auth, provider)
  .then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    setCredentials(GoogleAuthProvider.credentialFromResult(result));
    
    reauthenticateWithCredential(user, credentials).then(() => {
      // User re-authenticated.
  
      deleteUser(user)
      .then(setWebState(2));
      
    }).catch((error) => {
      console.log(error);
    });
  });
}
  return (
    <div className="App">
      {
        webState===0?(
          <BounceLoader />
        ):webState===1?(
          <button onClick={()=>handleDelete()}>
            DELETE ACCOUNT
          </button>
        ):(<div>Account Deleted</div>)
      }

    </div>
  );
}

export default App;
