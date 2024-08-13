import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../Recipe/recipe.model';
import { map, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient , private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put("https://shopping-app-be00a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json" , recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>("https://shopping-app-be00a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
    .pipe(
      map( recipes => {
        return recipes.map(recipe => {
          return {...recipe , ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap (recipes => {
        this.recipeService.setRecipes(recipes);
      }))
  }
}
