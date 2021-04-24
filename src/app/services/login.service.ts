import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ItemService} from './item.service';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userData: any;

  constructor(
    private angularFirestore: AngularFirestore,   // Inject Firestore service
    private angularFireAuth: AngularFireAuth, // Inject Firebase auth service
    private afs: AngularFirestore,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  AuthLogin(provider) {
    return this.angularFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  login(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  googleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  createUser(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  forgotPassword(passwordResetEmail) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  logout() {
    return this.angularFireAuth.signOut().then(() => {
    });
  }
}
