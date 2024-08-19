import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRespondData, AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = "";

  constructor (private AuthService : AuthService , private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    if (!authForm.valid) {
      return ;
    }
    const values = authForm.value;

    let authObs: Observable<AuthRespondData>;
    
    if (!this.isLoginMode) {
      authObs = this.AuthService.signUp(values.email , values.password);
      
    }else{
      authObs = this.AuthService.login(values.email , values.password);
    }

    authObs.subscribe(resData => {
      this.isLoading = false;

      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      this.error= errorMessage;
    });

    authForm.reset();
  }

  onHandleError() {
    this.error = "";
  }
}
