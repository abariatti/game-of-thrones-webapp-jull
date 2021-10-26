import { Component } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  disabledIconConfig: NbIconConfig = { icon: 'settings-2-outline', pack: 'eva' };


}
