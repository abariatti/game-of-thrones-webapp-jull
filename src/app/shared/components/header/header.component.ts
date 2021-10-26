import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isDarkMode = true;


  constructor(private themeService: NbThemeService) { }

  ngOnInit(): void {
  }

  // toggle between dark and light mode
  changeTheme(): void {
    console.log("toggle theme");

    if (this.isDarkMode) {
      this.themeService.changeTheme("default");
    } else {
      this.themeService.changeTheme("dark");
    }
  }

}
