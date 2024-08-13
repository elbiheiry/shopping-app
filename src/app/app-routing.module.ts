import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './Shopping/shopping-list/shopping-list.component';
import { RecipeComponent } from './Recipe/recipe.component';
import { StartComponent } from './Recipe/start/start.component';
import { DetailComponent } from './Recipe/detail/detail.component';
import { RecipeEditComponent } from './Recipe/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './services/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {path:'' , redirectTo: '/recipes' , pathMatch: 'full'},
  {path: 'recipes' , component: RecipeComponent , children : [
    {path: '' , component: StartComponent},
    {path: 'new' , component: RecipeEditComponent},
    {path: ':id' , component: DetailComponent , resolve: [RecipesResolverService]},
    {path: ':id/edit' , component: RecipeEditComponent , resolve: [RecipesResolverService]}
  ]},
  {path: 'shopping-list' , component: ShoppingListComponent},
  {path: 'auth' , component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
