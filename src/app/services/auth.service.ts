import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

export interface AuthRespondData {
  idToken : string,
  email : string,
  refreshToken : string,
  expiresIn : string,
  localId : string,
  registered ?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null as any);
  private tokenExpirationTimer : any;

  constructor(private http: HttpClient , private router: Router) { }

  signUp(email: string , password: string) {
    return this.http.post<AuthRespondData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.FIREBASE_KEY , {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError) , tap(resData => this.handleUser(resData.email , resData.localId , resData.idToken , +resData.expiresIn)))
  }

  login (email: string , password : string) {
    return this.http.post<AuthRespondData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.FIREBASE_KEY , {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError) , tap(resData => this.handleUser(resData.email , resData.localId , resData.idToken , +resData.expiresIn)))
  }

  logout () {
    this.user.next(null as any);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout (expirationDuration : number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
  
    if (!userDataString) {
      return;
    }

    const UserData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(userDataString);

    if (!UserData) {
      return ;
    }

    const loadedUser = new User(UserData.email , UserData.id , UserData._token , new Date(UserData._tokenExpirationDate));
    if (loadedUser.token){
      const expirationDuration = new Date(UserData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.user.next(loadedUser);
    }
    
  }

  private handleUser(email: string , userId: string , token: string , expiresIn: number) {
    const expirationDate = new Date(new Date() .getTime() + expiresIn * 1000);

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData' , JSON.stringify(user));
  }

  private handleError(httpError : HttpErrorResponse) {
    let errorMsg = "An unexpected error occurred";
      if (!httpError.error || !httpError.error.error) {
        return throwError(errorMsg);
      }

      switch(httpError.error.error.message){
        case('EMAIL_NOT_FOUND') :
          errorMsg = "There is no user record corresponding to this identifier. The user may have been deleted.";
          break;
        case("INVALID_PASSWORD") : 
          errorMsg = "The password is invalid or the user does not have a password.";
          break;
        case("USER_DISABLED") : 
          errorMsg = "The user account has been disabled by an administrator."
          break;
        case("INVALID_LOGIN_CREDENTIALS") : 
          errorMsg = "Email or password is invalid."
          break;
        case('EMAIL_EXISTS') :
          errorMsg = "Email already exists";
          break;
        case("OPERATION_NOT_ALLOWED") : 
          errorMsg = "Password sign-in is disabled for this project.";
          break;
        case("TOO_MANY_ATTEMPTS_TRY_LATER") : 
          errorMsg = "We have blocked all requests from this device due to unusual activity. Try again later."
          break;
      }

      return throwError(errorMsg);
  }
}
