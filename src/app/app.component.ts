import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import { environment } from "../environments/environment";
import { onMessage, getToken, isSupported } from "firebase/messaging";

@Component({
  selector: 'app-root',
  template: `
  Hello world<br>
  <span>{{message}}</span>
  `
})
export class AppComponent {
  message:any = 'xxxx';
  messaging:any;
  firebaseApp:any;
  constructor() {
    this.firebaseApp = initializeApp(environment.firebase);
    this.messaging = getMessaging(this.firebaseApp);
  }
  ngOnInit () {

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    getToken(this.messaging, { vapidKey: environment.firebase.vapidKey }).then(
      (token) => {
        if (token) {
          console.log('Get token. ', token);
          this.message = token
        } else {
          console.log('No registration token available. Request permission to generate one.');

          this.message = 'Error'
        }
      }
    );
    console.log('isSupported: ', isSupported());
    onMessage(this.messaging, (payload) => {
      console.log('message received. ', payload);
      this.message = payload
    });
  }
}
