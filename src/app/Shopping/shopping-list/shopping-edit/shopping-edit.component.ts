import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { NgForm, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../../Shopping/shopping-list/store/shopping-list.actions'; 

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit , OnDestroy{
  @ViewChild('f', {static: false}) slForm!: NgForm;

  subscription!: Subscription;
  editedItem!: number;
  editMode = false;
  editedItemIndex!: number;
  editedIitem!: Ingredient;
  
  constructor (private shoppingListService: ShoppingListService , private store: Store<{shoppingList : {ingredients : Ingredient[]}}>) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedIitem = this.shoppingListService.getIngredient(index);

        this.slForm.setValue({
          name : this.editedIitem.name,
          amount : this.editedIitem.amount
        })
    })
  }
  onAddIngredient(form: NgForm) {
    const value = form.value;
    const newIngredient =  new Ingredient(value.name , value.amount);

    if (this.editMode) {
      this.store.dispatch(new shoppingListActions.UpdateIngredient({index: this.editedItemIndex , ingredient: newIngredient}))
      // this.shoppingListService.updateIngedient(this.editedItemIndex , newIngredient);
    }else{
      // this.shoppingListService.onIngredientAdded(newIngredient);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.store.dispatch(new shoppingListActions.DeleteIngredient(this.editedItemIndex));
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
