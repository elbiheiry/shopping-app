import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from '../Recipe/recipe-routing.module';
import { authGuard } from '../guards/auth.guard';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule , RouterModule.forChild([
      {path: 'shopping-list' , canActivate: [authGuard], component: ShoppingListComponent},
    ]) ,FormsModule
  ]
})
export class ShoppingModule { }
