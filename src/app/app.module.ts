import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { StartComponent } from './Recipe/start/start.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipeModule } from './Recipe/recipe/recipe.module';
import { ShoppingModule } from './Shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    StartComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingModule
  ],
  providers: [RecipeService , ShoppingListService ,  {provide : HTTP_INTERCEPTORS , useClass : AuthInterceptorService , multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
