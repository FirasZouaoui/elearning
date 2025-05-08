import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reponse } from 'models/Reponse';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  private apiUrl = 'http://localhost:5287/api/Reponse';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${this.apiUrl}/${id}`);
  }

  getByQuestionId(questionId: number): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.apiUrl}/question/${questionId}`);
  }

  add(reponse: Reponse): Observable<Reponse> {
    return this.http.post<Reponse>(this.apiUrl, reponse);
  }

  update(id: number, reponse: Reponse): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, reponse);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
