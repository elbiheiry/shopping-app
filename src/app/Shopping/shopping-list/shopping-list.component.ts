import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../Shopping/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredients!: Observable<{ingredients : Ingredient[]}>;
  private igChangedSub!: Subscription;

  constructor (private shoppingListService: ShoppingListService , private store : Store<{shoppingList : {ingredients : Ingredient[]}}>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();

    // this.igChangedSub =this.shoppingListService.ingredientChanged.subscribe((ingredients : Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe();
  }
}
