import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../interface/userData.interface';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  apiUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<UserData[]>(this.apiUrl);
  }

  saveUser(user: UserData) {
    return this.http.post<UserData[]>(this.apiUrl, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  updateItem(userId: number, updatedUserData: UserData ) {
    return this.http.put<UserData>(
      `${this.apiUrl}/${userId}`,
      updatedUserData
    );
  }
}
