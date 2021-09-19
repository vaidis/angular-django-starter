import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'http://localhost:8000';
  username = '';
  signedin$ = new BehaviorSubject(true);
  user$ = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      `${this.rootUrl}/auth/username/`, {username}
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup/`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated, username }) => {
          this.username = username;

          if (authenticated === false) {
            this.user$.next("Anonymous");
          } else {
            this.user$.next(username);
          }

          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.get(`${this.rootUrl}/auth/signout`).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }


  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

}
