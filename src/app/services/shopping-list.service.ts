import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomato' , 5),
    new Ingredient('Apples' , 10)
  ];

  getIngredients () {
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);

    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
