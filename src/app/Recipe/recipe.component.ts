import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../shared/ingredient.model';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent implements OnInit{

  constructor(private recipeService: RecipeService , private dataStorageService: DataStorageService){}
  ngOnInit() {
    this.dataStorageService.fetchRecipes().subscribe(recipes => {
      this.recipeService.recipesChanged.next(recipes);
    });
  }
  
}
