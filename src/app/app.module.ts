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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { StartComponent } from './Recipe/start/start.component';
import { RecipeEditComponent } from './Recipe/recipe-edit/recipe-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

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
    DropdownDirective,
    StartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService , ShoppingListService ,  {provide : HTTP_INTERCEPTORS , useClass : AuthInterceptorService , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
