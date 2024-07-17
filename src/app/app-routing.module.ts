import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './Shopping/shopping-list/shopping-list.component';
import { RecipeComponent } from './Recipe/recipe.component';
import { StartComponent } from './Recipe/start/start.component';
import { DetailComponent } from './Recipe/detail/detail.component';
import { RecipeEditComponent } from './Recipe/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path:'' , redirectTo: '/recipes' , pathMatch: 'full'},
  {path: 'recipes' , component: RecipeComponent , children : [
    {path: '' , component: StartComponent},
    {path: 'new' , component: RecipeEditComponent},
    {path: ':id' , component: DetailComponent},
    {path: ':id/edit' , component: RecipeEditComponent}
  ]},
  {path: 'shopping-list' , component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
