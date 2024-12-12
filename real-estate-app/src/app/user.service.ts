import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/properties`);
  }

  getProperty(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/properties/${id}`);
  }

  createHouse(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/properties`, data);
  }

  updateHouse(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/properties/${id}`, data);
  }

  deleteHouse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/properties/${id}`);
  }

  searchProperties(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/properties?search=${query}`);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  signup(data: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user).id;
      } catch (e) {
        console.error('Error parsing user data:', e);
        return 0;
      }
    }
    return 0; // or handle this case appropriately
  }
}
