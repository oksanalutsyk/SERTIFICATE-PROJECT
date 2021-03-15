import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/shaared/services/shopping-list.service';

import * as ShoppingListActions from '../../store/actions/shopping-list.actions'
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService,
    private store:Store<{shoppingList:{ingredients:Ingredient[]}}>
    ) {}

  testForm: FormGroup;

  subscription: Subscription;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.testForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$'),
      ]),
    });

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.testForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const value = this.testForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
      this.editMode = false;
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      // create a new Object = dispatch action
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    console.log(this.testForm.value);
    this.testForm.reset();
  }

  clearForm() {
    this.testForm.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.clearForm()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
