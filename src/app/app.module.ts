import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SharedModule } from './shaared/shared.module';
import { CoreModule } from './core.module';

import { shoppingListReducer } from './store/reducers/shopping-list.reducer';
import { authReducer } from './store/reducers/auth.reducer';

import * as fromApp from './store/reducers/app.reducer'
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    CoreModule,
    SharedModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
