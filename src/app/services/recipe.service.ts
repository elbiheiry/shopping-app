import { Injectable } from '@angular/core';
import { Recipe } from '../Recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'Classic burger' ,
      'Beef burger with cheese' ,
      'https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?s=2048x2048&w=is&k=20&c=wydysVEp52o1ULrj9XWI_f8M2lZ06qm8xlBl6GmjTSQ=',
    [
      new Ingredient('Beef' , 1),
      new Ingredient('tomato' , 2),
      new Ingredient('lettuce' , 2),
      new Ingredient('french fries' , 2)
    ]),
    new Recipe(
      'Macroni pasta',
      'Extra cheesy pasta',
      'https://www.foodandwine.com/thmb/YlgBj_G9a_psYSzA3gfU6gx9A3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg',
    [
      new Ingredient('macroni' , 1),
      new Ingredient('cheese' , 2),
      new Ingredient('french fries' , 2)
    ])
  ];
  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]; 
  }

  addIngredientToShoppingList(ingredients : Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
