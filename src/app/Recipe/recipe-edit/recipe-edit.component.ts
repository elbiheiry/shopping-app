import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  enableEdit: boolean = false;
  recipe!: Recipe;

  constructor(private route: ActivatedRoute , private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.enableEdit = params['id'] != null;
      this.recipe = this.recipeService.getRecipe(+params['id']);
    })
  }
}
