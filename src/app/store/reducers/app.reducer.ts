
import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../reducers/shopping-list.reducer';
import * as fromAuth from '../reducers/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
