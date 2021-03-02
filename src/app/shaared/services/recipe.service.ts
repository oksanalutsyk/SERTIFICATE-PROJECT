import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test Reipe',
      'This is a simply test',
      'https://static.onecms.io/wp-content/uploads/sites/9/2020/03/19/birria-tacos-FT-RECIPE0420-1.jpg',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'A test Reipe 2',
      'This is a second test',
      'https://static.onecms.io/wp-content/uploads/sites/9/2020/03/19/birria-tacos-FT-RECIPE0420-1.jpg',
      [new Ingredient('Bread', 2), new Ingredient('Meat', 3)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // get copy recipes
  }

  getRecipe(index:number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngretients(ingredients);
    console.log(ingredients)
  }
}
