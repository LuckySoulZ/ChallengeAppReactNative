import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD7o1JzILLPcHB0Oiop42nXGecyKXYfyCQ",
    authDomain: "challengeapp-dfe65.firebaseapp.com",
    projectId: "challengeapp-dfe65",
    storageBucket: "challengeapp-dfe65.appspot.com",
    messagingSenderId: "81224852186",
    appId: "1:81224852186:web:3d391a0c9e651b732f7be3",
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);

}

export { firebase };
