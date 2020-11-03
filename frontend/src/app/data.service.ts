import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JWT } from './model/model/JWT';
import { LoginPageForm } from './model/model/LoginPageForm';
import { RegisterPageForm } from './model/model/RegisterPageForm';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  authenticate(loginPageForm: LoginPageForm): Observable<JWT> {
    return this.http.post<JWT>(environment.baseURL + "/authenticate", loginPageForm)
    .pipe(
      catchError(this.handleError)
    );
  }

  register(registerPageForm: RegisterPageForm): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/register", registerPageForm)
    .pipe(
      catchError(this.handleError)
    );
  }

  validateToken(token: String): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/validateToken", token)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
