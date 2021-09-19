import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SignoutComponent } from './auth/signout/signout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent, data: {title: ' '}},
      { path: 'profile', component: ProfileComponent, data: {title: 'Profile'}},
      { path: 'about', component: AboutComponent, data: {title: 'About'}},
      { path: 'contact', component: ContactComponent, data: {title: 'Contact'}},
      { path: 'signin', component: SigninComponent, data: {title: 'Signin'}},
      { path: 'signout', component: SignoutComponent, data: {title: 'Signout'}},
      { path: 'signup', component: SignupComponent, data: {title: 'Signup'}},
    ]
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
