import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'models/Question';
import { Reponse } from 'models/Reponse';
import { Certificat } from 'models/Certificat'; // Import Certificat model
import { forkJoin } from 'rxjs';
import { AuthService } from 'Services/auth-service.service';
import { QuestionService } from 'Services/question.service';
import { ReponseService } from 'Services/reponse.service';
import { TestService } from 'Services/test.service';
import { CertificatService } from 'Services/certificat.service'; // Import CertificatService
import { Test } from 'models/test';

interface UserAnswer {
  questionId: number;
  answerId: number;
  isCorrect: boolean;
}

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.css']
})
export class PassTestComponent implements OnInit {
  testId: number | null = null;
  userId: string | null = null;
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: UserAnswer[] = [];
  loading: boolean = true;
  test: Test | null = null;
  score: number = 0;
  reponses: Reponse[] = [];
  testStarted: boolean = false;
  testCompleted: boolean = false;
  resultMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private testService: TestService,
    private questionService: QuestionService,
    private reponseService: ReponseService,
    private certificatService: CertificatService // Add CertificatService
  ) {}

  ngOnInit(): void {
    this.testId = +this.route.snapshot.paramMap.get('id')!;
    this.userId = this.authService.userId;

    if (!this.userId) {
      this.resultMessage = 'Utilisateur non authentifié, veuillez vous connecter.';
      return;
    }

    this.loadTestDetails();
  }

  loadTestDetails(): void {
    this.loading = true;
    forkJoin([
      this.testService.getTestById(this.testId!),
      this.questionService.getQuestionsByTestId(this.testId!)
    ]).subscribe({
      next: ([test, questions]) => {
        this.test = test;
        this.questions = Array.isArray(questions) ? questions : [];
        this.loading = false;
        if (this.questions.length === 0) {
          this.resultMessage = 'Aucune question disponible pour ce test.';
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des données', err);
        this.resultMessage = 'Erreur lors du chargement des données.';
        this.loading = false;
      }
    });
  }

  loadReponsesForCurrentQuestion(): void {
    if (this.questions.length > 0 && this.currentQuestionIndex < this.questions.length) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.reponseService.getByQuestionId(currentQuestion.idQuestion).subscribe({
        next: (reponses) => {
          this.reponses = reponses;
        },
        error: (err) => {
          console.error(`Erreur lors du chargement des réponses pour la question ${currentQuestion.idQuestion}:`, err);
          this.reponses = [];
        }
      });
    }
  }

  handleAnswerChange(questionId: number, answerId: number, isCorrect: boolean): void {
    const updatedAnswers = this.userAnswers.filter(answer => answer.questionId !== questionId);
    updatedAnswers.push({ questionId, answerId, isCorrect });
    this.userAnswers = updatedAnswers;

    if (isCorrect) {
      this.score += 1;
    }
  }

  handleNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex += 1;
      this.loadReponsesForCurrentQuestion();
    }
  }

  handlePreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex -= 1;
      this.loadReponsesForCurrentQuestion();
    }
  }

  handleFinishTest(): void {
    const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = this.questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    if (percentage > 75) {
      this.resultMessage = 'Félicitations, vous avez obtenu plus de 75% de bonnes réponses ! Un certificat a été généré.';
      
      // Create certificate
      const certificat: Certificat = {
        idCertificat: 0, // Will be set by backend
        userId: { id: this.userId! } as any, // Adjust based on your User model
        testId: { idTest: this.testId! } as any // Adjust based on your Test model
      };

      this.certificatService.create(certificat).subscribe({
        next: (response) => {
          console.log('Certificat créé avec succès:', response);
        },
        error: (err) => {
          console.error('Erreur lors de la création du certificat:', err);
          this.resultMessage += ' Cependant, une erreur s\'est produite lors de la génération du certificat.';
        }
      });
    } else {
      this.resultMessage = 'Désolé, vous n\'avez pas atteint les 75% de bonnes réponses.';
    }

    this.testCompleted = true;
    setTimeout(() => {
      this.router.navigate(['/ListeFormationPubli']);
    }, 3000);
  }

  startTest(): void {
    this.testStarted = true;
    this.loadReponsesForCurrentQuestion();
  }

  isAnswerSelected(questionId: number, answerId: number): boolean {
    return this.userAnswers.some(answer => answer.questionId === questionId && answer.answerId === answerId);
  }
}