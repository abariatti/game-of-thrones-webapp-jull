import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbLayoutModule, NbInputModule, NbButtonModule, NbAlertModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbCardModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    FormsModule,
    NbButtonModule,
    NbAlertModule,
  ]
})


export class AuthModule { }
