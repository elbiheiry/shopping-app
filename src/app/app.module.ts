import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './Recipe/start/start.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeModule } from './Recipe/recipe/recipe.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './Shopping/shopping.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './Shopping/shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingModule,
    SharedModule,
    CoreModule,
    AuthModule,
    StoreModule.forRoot({shoppingList : shoppingListReducer})
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
