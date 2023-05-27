const firebaseConfig = {
    apiKey: "AIzaSyBljmp71SMLQBarfKIiYxsJfagLYJefHXA",
    authDomain: "cricket-blog-e5194.firebaseapp.com",
    projectId: "cricket-blog-e5194",
    storageBucket: "cricket-blog-e5194.appspot.com",
    messagingSenderId: "596254569958",
    appId: "1:596254569958:web:d28a5bc060fa1aec159227"
  };
   

firebase.initializeApp(firebaseConfig);

let db=firebase.firestore();
let auth=firebase.auth();
