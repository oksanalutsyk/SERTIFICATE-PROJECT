import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENTS = '[Shopping List] Update Ingrediend';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingrediend';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENTS;

  constructor(public payload: Ingredient) {}
}

export class DeleteIngredients implements Action {
  readonly type = DELETE_INGREDIENT;

}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload:number) {

  }
}
export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}


export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredients
  | DeleteIngredients
  | StartEdit
  | StopEdit;
