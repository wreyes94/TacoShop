import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { empty, Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RecipesService {
    public refreshPage: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public url: string = 'http://localhost:3000/recipes';

    constructor( private http: HttpClient) { }

    public getRecipes() {
        return this.http.get(this.url)
        .pipe(catchError(this.handleError))  
    }

    public saveRecipe(newRecipe) {
        return this.http.post(this.url, newRecipe)
        .pipe(catchError(this.handleError))
    }

    public updateRecipe(recipe) {
        return this.http.put(this.url + '/' + recipe.id, recipe)
        .pipe(catchError(this.handleError))
    }

    public deleteRecipe(id) {
        return this.http.delete(this.url + '/' + id)
        .pipe(catchError(this.handleError))
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