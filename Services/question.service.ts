import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:5287/api';  // URL de base de l'API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les questions
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/Question`);
  }

  // Récupérer une question par son ID
  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/Question/${id}`);
  }

  // Récupérer les questions par testId
  getQuestionsByTestId(testId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/Question/test/${testId}`);
  }

  // Créer une nouvelle question
  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/Question`, question);
  }

  // Mettre à jour une question existante
  updateQuestion(id: number, question: Question): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/Question/${id}`, question);
  }

  // Supprimer une question
  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Question/${id}`);
  }
}
