import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from 'models/formation';

import { Observable } from 'rxjs';
interface EnrollResponse {
  alreadyEnrolled: boolean;
  formationId: number;
}
@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:5287/api/Formation';

  constructor(private http: HttpClient) {}

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}`);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }
  getPaginatedFormations(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/formationPage?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  createFormation(formData: FormData): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formData);
  }
  
  enroll(idFormation: number): Observable<EnrollResponse> {
    console.log('Envoi de la requête enroll avec id:', idFormation); // Débogage
    return this.http.post<EnrollResponse>(
      `http://localhost:5287/api/Account/enroll`,
      JSON.stringify(idFormation),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  updateFormation(id: number, formData: FormData): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formData);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addFormation(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}


