import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './app.model';


@Injectable({ providedIn: 'root' })

export class AppService {

  private usersUrl = 'users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getLeaderBoardMembers(): Observable<any> {
    return this.http.get<any>(this.usersUrl)
      .pipe(
        tap(_ => console.log('fetched users')),
        catchError(e => of([]))
      );
  }

  signUp(user: User): Observable<User | never[]> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => console.log(`added User w/ id=${newUser.email}`)),
      catchError(e => of([]))
    );
  }
  
  updateScore(user: User): Observable<User | never[]>{
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user, this.httpOptions).pipe(
        tap((newUser: User) => console.log(`Updated score`)),
        catchError(e => of([]))
      );
  }
}