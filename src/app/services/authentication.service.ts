import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../model/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private authenticationUrl = 'api/authentication';
  constructor(private http: HttpClient) { }

  authenticate(credentials: Credentials): Observable<User> {
    return this.http.post<User>(this.authenticationUrl, credentials, this.httpOptions).pipe(
      tap((userResult: User) => {
        const jsonLoggedInUser = JSON.stringify(userResult);
        localStorage.setItem('currentUser', jsonLoggedInUser);
      }),
      catchError(this.handleError)
    );
  }

  invalidate(): Observable<void> {
    localStorage.removeItem('currentUser');
    return null;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
