import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import * as ShoppingListActions from '../store/actions/shopping-list.actions'
import * as fromApp from '../store/reducers/app.reducer'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Observable<{ingredients:Ingredient[]}> ;


  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    console.log(this.ingredients)

  }

  onEditItem(index:number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe()
  }
}
