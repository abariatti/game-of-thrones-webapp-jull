import { LayoutComponent } from './shared/components/layout/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbThemeModule, NbLayoutModule, NbActionsModule, NbIconModule, NbToggleModule, NbUserModule, NbMenuService } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from './shared/components/header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbActionsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbToggleModule,
    NbUserModule,
    FormsModule,
  ],
  providers: [NbMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
