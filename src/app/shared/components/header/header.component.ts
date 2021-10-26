import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkMode = true;
  username = '';
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];


  constructor(private themeService: NbThemeService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.authService.currentUser.name;
  }

  // toggle between dark and light mode
  changeTheme(): void {
    if (this.isDarkMode) {
      this.themeService.changeTheme("default");
    } else {
      this.themeService.changeTheme("dark");
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
  }

}
