import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from 'models/test';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:5287/api/Test';

  constructor(private http: HttpClient) {}

  // Récupérer tous les tests
  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl);
  }

  // Récupérer un test par son ID
  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les tests par formation ID
  getTestsByFormationId(formationId: number): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/formation/${formationId}`);
  }

  // Créer un nouveau test
  createTest(test: Test): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.apiUrl, test, { headers });
  }

  // Mettre à jour un test existant
  updateTest(test: Test): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<any>(`${this.apiUrl}/${test.idTest}`, test, { headers });
  }

  // Supprimer un test
  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
