import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shaared/services/auth.service';
import { DataStorageService } from '../shaared/services/data-storage.service';
import * as fromApp from '../store/reducers/app.reducer';
import * as AuthActions from '../store/actions/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        // this.subscription = this.authService.user.subscribe((user) => {
        this.isAuthenticated = !user ? false : true;
      });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut())
    // this.authService.logOut();
    // this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
