import { Action } from "@ngrx/store";
import { Ingredient } from "../../../shared/ingredient.model";
import * as shoppingListActions from "./shopping-list.actions";

export interface State {
    ingredients: Ingredient[];
}

const initialState: State = {
    ingredients: [
        new Ingredient('Tomato' , 5),
        new Ingredient('Apples' , 10)
    ]
}

export function shoppingListReducer(state = initialState , action: any): State 
{
    switch (action.type) {
        case shoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients , (action as shoppingListActions.AddIngredient).payload]
            };
        case shoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients , ...(action as shoppingListActions.AddIngredients).payload]
            };
        case shoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients : updatedIngredients
            }

        case shoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig , igIndex) => {
                    return igIndex !== action.payload
                })
            }       
        default:
            return state;
    }
}