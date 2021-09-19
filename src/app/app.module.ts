import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModules } from "./material.module";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';

import { AuthModule } from './auth/auth.module';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { UsermenuComponent } from './layout/usermenu/usermenu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    UsermenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    AuthModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
