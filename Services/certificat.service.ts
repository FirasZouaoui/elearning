import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certificat } from '../models/Certificat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificatService {
  private apiUrl = 'http://localhost:5287/api/Certificat';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Certificat> {
    return this.http.get<Certificat>(`${this.apiUrl}/${id}`);
  }

  getByUserId(userId: string): Observable<Certificat[]> {
    return this.http.get<Certificat[]>(`${this.apiUrl}/user/${userId}`);
  }

  create(certificat: Certificat): Observable<Certificat> {
    // Ne pas envoyer les objets User/Test complets dans la requête
    const body = {
      userId: certificat.userId?.id,     // Supposant que User a une propriété `id`
      testId: certificat.testId?.idTest, // Supposant que Test a une propriété `idTest`
    };
    return this.http.post<Certificat>(this.apiUrl, body);
  }

  update(certificat: Certificat): Observable<Certificat> {
    const body = {
      idCertificat: certificat.idCertificat,
      userId: certificat.userId?.id,
      testId: certificat.testId?.idTest,
    };
    return this.http.put<Certificat>(`${this.apiUrl}/${certificat.idCertificat}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
