import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';

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

  constructor(private http: HttpClient) { }

  signUp(email: string , password: string) {
    return this.http.post<AuthRespondData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnj-stJ1Fe3WV8n8sWo08wzI0bndC95Dk" , {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError) , tap(resData => this.handleUser(resData.email , resData.localId , resData.idToken , +resData.expiresIn)))
  }

  login (email: string , password : string) {
    return this.http.post<AuthRespondData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnj-stJ1Fe3WV8n8sWo08wzI0bndC95Dk" , {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError) , tap(resData => this.handleUser(resData.email , resData.localId , resData.idToken , +resData.expiresIn)))
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
