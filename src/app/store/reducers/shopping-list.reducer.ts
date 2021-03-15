import { Action } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import * as ShoppingListActions from '../actions/shopping-list.actions';

const initState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state = initState,
  action: ShoppingListActions.AddIngredient
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        
      };
      default:
          return state;

  }
}
