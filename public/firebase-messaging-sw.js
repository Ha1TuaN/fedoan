importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

const firebaseConfig = {
    apiKey: 'AIzaSyCvwumeAnOurwgcikh5M_Vh84b0cF4xix0',
    authDomain: 'notification-67308.firebaseapp.com',
    projectId: 'notification-67308',
    storageBucket: 'notification-67308.appspot.com',
    messagingSenderId: '470155449922',
    appId: '1:470155449922:web:3d0030e0e620c8213cffdb',
    measurementId: 'G-18EQZZ6JMY',
};

// Retrieve firebase messaging
const messaging = firebase.messaging();
