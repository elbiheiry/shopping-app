import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { authGuard } from '../guards/auth.guard';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule ,
    SharedModule ,
    RouterModule.forChild([
      {path: '' , canActivate: [authGuard], component: ShoppingListComponent},
    ])
  ]
})
export class ShoppingModule { }
