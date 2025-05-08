import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from 'models/Cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:5287/api/Cours'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiUrl);
  }

  getById(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${id}`);
  }

  getByTitle(title: string): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/title/${title}`);
  }

  getByFormation(idFormation: number): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/formation/${idFormation}`);
  }

  create(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiUrl, cours);
  }

  update(id: number, cours: Cours): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, cours);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
