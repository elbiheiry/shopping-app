import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  @ViewChild('nameInput') NameInputRef !: ElementRef;
  @ViewChild('amountInput') AmountInputRef !: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddIngredient() {
    const nameInput = this.NameInputRef.nativeElement.value;
    const amountInput = this.AmountInputRef.nativeElement.value;
    const newIngredient =  new Ingredient(nameInput , amountInput);
    this.ingredientAdded.emit(newIngredient);
  }
}
