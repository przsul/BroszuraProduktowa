import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommentRating } from '../model/CommentRating';
import { JWT } from '../model/JWT';
import { LoginPageForm } from '../model/LoginPageForm';
import { Product } from '../model/Product';
import { RegisterPageForm } from '../model/RegisterPageForm';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  product: Product;

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

  validateToken(token: String): Promise<boolean> {
    return this.http.post<any>(environment.baseURL + "/validateToken", token)
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(environment.baseURL + "/getProducts", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(environment.baseURL + "/getProduct/" + productId, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/addProduct", product, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put<any>(environment.baseURL + "/editProduct/" + product.id, product, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(environment.baseURL + "/deleteProduct/" + productId, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  addToFavorite(productId: number): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/addToFavorite/" + productId, null, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteFromFavorite(productId: number): Observable<any> {
    return this.http.delete<any>(environment.baseURL + "/deleteFromFavorite/" + productId, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  getFavoriteProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(environment.baseURL + "/getFavoriteProducts", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  searchProduct(query: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(environment.baseURL + "/searchProduct?q=" + query, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  getCommentsRatings(productId: number): Observable<Array<CommentRating>> {
    return this.http.get<Array<CommentRating>>(environment.baseURL + "/getCommentsRatings/" + productId, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  addCommentRating(commentRating: CommentRating, productId: number): Observable<any> {
    return this.http.post<any>(environment.baseURL + "/addCommentRating/" + productId, commentRating, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCommentRating(commentRatingId: number): Observable<any> {
    return this.http.delete<any>(environment.baseURL + "/deleteCommentRating/" + commentRatingId, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("jwt"))
    })
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
