import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user/user-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserServices {
  private URL = 'https://684b0d86165d05c5d35b5b09.mockapi.io/api/test/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.URL, user);
  }

  update(id: number, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.URL}/${id}`, updatedUser);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

}
