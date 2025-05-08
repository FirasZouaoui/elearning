import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'Services/question.service';
import { TestService } from 'Services/test.service';
import { Question } from 'models/Question';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {
  questions: Question[] = [];
  testId!: number;
  test: any = null;
  error: string = '';

  constructor(
    private questionService: QuestionService,
    private testService: TestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.fetchTest();
    this.fetchQuestions();
  }

  fetchTest() {
    this.testService.getTestById(this.testId).subscribe({
      next: (data) => {
        this.test = data;
      },
      error: () => {
        this.error = 'Échec de la récupération du test';
      }
    });
  }

  fetchQuestions() {
    this.questionService.getQuestionsByTestId(this.testId).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: () => {
        this.error = 'Échec de la récupération des questions';
      }
    });
  }

  handleDelete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cette question ?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: () => {
          this.fetchQuestions();
        },
        error: () => {
          this.error = 'Échec de la suppression de la question';
        }
      });
    }
  }

  goToModify(id: number) {
    this.router.navigate([`/admin/test/${this.testId}/modify-question/${id}`]);
  }

  goToResponses(id: number) {
    this.router.navigate([`/admin/question/${id}/responses`]);
  }

  goToAdd() {
    this.router.navigate([`/admin/test/${this.testId}/add-question`]);
  }
}
