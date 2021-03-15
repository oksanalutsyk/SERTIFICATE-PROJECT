import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';

import * as ShoppingListActions from '../../store/actions/shopping-list.actions';
import * as fromShoppingList from '../../store/reducers/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {}

  testForm: FormGroup;

  subscription: Subscription;

  editMode = false;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.testForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
    });

    this.subscription = this.store.select('shoppingList').subscribe(stateData =>{
      if (stateData.editedIngredientIndex >-1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.testForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    })

  }

  onSubmit() {
    const value = this.testForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
    
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredients(
          newIngredient,
        )
      );
      this.editMode = false;
    } else {
   
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    console.log(this.testForm.value);
    this.testForm.reset();
  }

  clearForm() {
    this.testForm.reset();
    this.editMode = false;

    this.store.dispatch(new ShoppingListActions.StopEdit)

  }

  deleteItem() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredients()
    );
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit)

  }
}
