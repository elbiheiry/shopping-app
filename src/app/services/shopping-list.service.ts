import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Tomato' , 5),
    new Ingredient('Apples' , 10)
  ];

  getIngredients () {
    return this.ingredients.slice();
  }

  getIngredient (index: number) {
    return this.ingredients[index];
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);

    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngedient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;

    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index , 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
