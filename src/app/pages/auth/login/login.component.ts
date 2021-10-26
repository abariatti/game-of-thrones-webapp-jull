import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name = "";
  password = "";
  loginFailed = false;

  constructor(private router: Router, ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.password === '123456') {
      // login successful
      localStorage.setItem("loggedin", "true");
      this.router.navigate(["/home"]);

    } else {
      this.loginFailed = true;
    }
  }

}
