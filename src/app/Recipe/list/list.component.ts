import { Component,OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  recipes!: Recipe[];

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  constructor (private recipeService: RecipeService) {
    
  }
}
