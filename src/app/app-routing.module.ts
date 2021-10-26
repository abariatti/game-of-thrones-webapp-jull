import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "**", redirectTo: "login"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
