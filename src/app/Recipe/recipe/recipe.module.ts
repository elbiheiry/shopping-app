import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeComponent } from '../recipe.component';
import { DetailComponent } from '../detail/detail.component';
import { ItemComponent } from '../list/item/item.component';
import { ListComponent } from '../list/list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from '../recipe-routing.module';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    DetailComponent,
    RecipeComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule , RouterModule , ReactiveFormsModule, RecipeRoutingModule
  ]
})
export class RecipeModule { }
