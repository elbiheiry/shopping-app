import { Component, OnInit } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  // providers : [RecipeService]
})
export class AppComponent implements OnInit{
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
