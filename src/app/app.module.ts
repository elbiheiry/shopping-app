import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './Recipe/list/list.component';
import { ItemComponent } from './Recipe/list/item/item.component';
import { DetailComponent } from './Recipe/detail/detail.component';
import { RecipeComponent } from './Recipe/recipe.component';
import { ShoppingListComponent } from './Shopping/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './Shopping/shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ItemComponent,
    DetailComponent,
    RecipeComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
