import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeComponent } from "./recipe.component";
import { authGuard } from "../guards/auth.guard";
import { StartComponent } from "./start/start.component";
import { RecipesResolverService } from "../services/recipes-resolver.service";
import { DetailComponent } from "./detail/detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

const routes: Routes = [{
    path: '' , component: RecipeComponent , canActivate: [authGuard] , children : [
        {path: '' , component: StartComponent},
        {path: 'new' , component: RecipeEditComponent},
        {path: ':id' , component: DetailComponent , resolve: [RecipesResolverService]},
        {path: ':id/edit' , component: RecipeEditComponent , resolve: [RecipesResolverService]}
    ]
}];

@NgModule({
    imports : [RouterModule.forChild(routes)]
})

export class RecipeRoutingModule { 

}