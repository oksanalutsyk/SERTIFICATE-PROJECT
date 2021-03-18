import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/reducers/app.reducer';
import * as AuthActions from '../../store/actions/auth.actions';


@Injectable()
export class AuthService {
  private tokenExpiratiionTimer: any;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}


  setLogoutTimer(expirationDuration: number) {
    this.tokenExpiratiionTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.LogOut())
    }, expirationDuration);
  }
  
  clearLogoutTimer() {
    if(this.tokenExpiratiionTimer) {
      clearTimeout(this.tokenExpiratiionTimer);
      this.tokenExpiratiionTimer = null;
    }
  }
}
