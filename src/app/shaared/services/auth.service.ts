import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

import { environment } from '../../../environments/environment'
export interface AuthResponseData {
  //  kind:string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpiratiionTimer: any;

  constructor(private http: HttpClient) {}

  //   Web API Key
  //   AIzaSyBfVbwSWS5Nk0ajWHUSJtp9lpTNTRyttmk

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,

        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);

      const expirationDuration = new Date(
        userData._tokenExpirationDate
      ).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpiratiionTimer) {
      clearTimeout(this.tokenExpiratiionTimer);
    }
    this.tokenExpiratiionTimer = null;
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpiratiionTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured !';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exist already';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exist already';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid';
        break;
      default:
        errorMessage = 'ERROR';
    }
    return throwError(errorMessage);
  }
}
