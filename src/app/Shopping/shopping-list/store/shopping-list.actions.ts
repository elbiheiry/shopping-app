import { Action } from "@ngrx/store";
import { Ingredient } from "../../../shared/ingredient.model";

export const ADD_INGREDIENT = 'Add_INGREDIENT';
export const ADD_INGREDIENTS = 'Add_INGREDIENTS';
export const UPDATE_INGREDIENT = 'Update_INGREDIENT';
export const DELETE_INGREDIENT = 'Delete_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    
    constructor (public payload: Ingredient){}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor (public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    
    constructor (public payload: {index: number , ingredient: Ingredient}){}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    
    constructor (public payload: number){}
}

export type shoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient;