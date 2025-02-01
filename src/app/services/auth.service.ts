import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.stringify(localStorage.getItem('user')!);
      }
    });
  }

  getIsLoggedIn() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null;
  }

  getUserId() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user.uid;
  }

  login() {
    return signInWithPopup(this.auth, new GoogleAuthProvider()).then(() =>
      this.router.navigate(['dashboard'])
    );
  }

  logout() {
    signOut(this.auth).then(() => this.router.navigate(['login']));
  }
}
