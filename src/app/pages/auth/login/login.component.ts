import { AuthService } from './../../../shared/services/auth.service';
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    let result = this.authService.login(this.name, this.password);
    if (result) {
      // login successful
      this.router.navigate(["/"]);
    } else {
      this.loginFailed = true;
    }


  }

}
