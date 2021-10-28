import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


interface User {
  name: string,
  isLoggedIn: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  PASSWORD = '123456';
  user = new BehaviorSubject<User>({
    name: '',
    isLoggedIn: false,
  });
  user$ = this.user.asObservable();

  constructor() {
    const userObj = JSON.parse(localStorage.getItem('user') || '{}');
    if (userObj.isLoggedIn) {
      this.user.next(JSON.parse(localStorage.getItem('user') || '{}'));
    } else {
      this.user.next({
        name: '',
        isLoggedIn: false,
      });
    }
  }

  get currentUser() {
    return this.user.value;
  }

  // login user
  login(name: string, password: string): boolean {

    if (password === this.PASSWORD) {
      const user = {
        name: name,
        isLoggedIn: true,
      }
      localStorage.setItem("user", JSON.stringify(user));
      this.user.next(user);
      return true;

    } else {
      localStorage.removeItem("user");
      return false;
    }
  }

  logout() {
    localStorage.removeItem("user");
  }
}
