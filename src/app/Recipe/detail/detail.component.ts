import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  @Input() recipe!: Recipe;

  constructor (private recipeService: RecipeService) {}
  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }
}
