import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {ItemService} from './item.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userData: any;

  constructor(
    private angularFirestore: AngularFirestore,   // Inject Firestore service
    private angularFireAuth: AngularFireAuth, // Inject Firebase auth service
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

  login(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
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
