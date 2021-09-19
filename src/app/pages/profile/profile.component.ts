import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  signedin$: BehaviorSubject<boolean>;
  username$: BehaviorSubject<string>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
    this.username$ = this.authService.user$;
  }

  ngOnInit() {
    console.log("profile -------------------")
    this.authService.checkAuth().subscribe(() => {});
  }

}