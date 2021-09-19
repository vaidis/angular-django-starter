import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
})
export class UsermenuComponent {
  signedin$: BehaviorSubject<boolean>;
  themeColor = 'light-theme';

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
    this.setDefaultTheme();
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }

  setDefaultTheme() {
    if (localStorage.getItem('pxTheme')) {
      console.log("theme 2 >>>>> ", localStorage.getItem('pxTheme'))
      this.themeColor = localStorage.getItem('pxTheme');
      const body = document.getElementsByTagName('body')[0];
      body.classList.add(this.themeColor);
    }
  }

  themeSwitcher() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.themeColor);
    (this.themeColor == 'light-theme') ? this.themeColor = 'dark-theme' : this.themeColor = 'light-theme';
    body.classList.add(this.themeColor);
    localStorage.setItem('pxTheme', this.themeColor);
  }
  
}
