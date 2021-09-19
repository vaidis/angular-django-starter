import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';

import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/filter';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  sidenavMode: string = 'over';
  isSidenavOpen: boolean = true;
  menuItems: any[];



  constructor(
    private router: Router,
    private observer: BreakpointObserver
  ) { }

  private wasSidenavOpen(): boolean {
    let savedState = localStorage.getItem("sidenavOpen");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return true;
  }

  private setSidenavMode() {
    if (window.innerWidth < 768) {
      console.log("setSidenavMode() sidenavMode = over");
      this.sidenavMode = 'over';
      this.isSidenavOpen = false;
      // this.sidenav.close();
    }
    else {
      console.log("setSidenavMode() sidenavMode = side");
      this.sidenavMode = 'side';
      this.isSidenavOpen = this.wasSidenavOpen();
      // if (this.isSidenavOpen)
      //   this.sidenav.open();
    }
  }

  private subscribeToRouteChangeEvent() {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
          console.log("subscribeToRouteChangeEvent() sidenav.mode === 'over'")
        }
      }
    });

  }

  @HostListener('window:resize', ['$event'])
	onResize() {
    this.setSidenavMode();
	}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.subscribeToRouteChangeEvent();
    this.setSidenavMode();
  }


  toggleSidenav() {
    // console.log("1 toggleSidenav() this.sidenav.mode = ", this.sidenav.mode);
    // console.log("1 toggleSidenav() this.sidenavMode = ", this.sidenavMode);

    if (this.sidenavMode === 'over') {
      this.sidenav.toggle();
      this.isSidenavOpen = !this.isSidenavOpen;
      localStorage.setItem("sidenavOpen", JSON.stringify(this.isSidenavOpen));
      // console.log("2 toggleSidenav() this.sidenav.toggle()");
    }
    else {
      this.sidenav.open();
      console.log("2 toggleSidenav() this.sidenav.open()");
    }
    // console.log("3 toggleSidenav() this.sidenav.mode = ", this.sidenav.mode);
    // console.log("3 toggleSidenav() this.sidenavMode = ", this.sidenavMode);
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }


}
