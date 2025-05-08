import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReponseService } from 'Services/reponse.service';
import { Reponse } from 'models/Reponse';

@Component({
  selector: 'app-question-responses',
  templateUrl: './question-responses.component.html',
  styleUrls: ['./question-responses.component.css']
})
export class QuestionResponsesComponent implements OnInit {
  questionId!: number;
  responses: Reponse[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.fetchResponses();
  }

  fetchResponses(): void {
    this.reponseService.getByQuestionId(this.questionId).subscribe({
      next: (data) => this.responses = data,
      error: () => this.error = "Échec de la récupération des réponses."
    });
  }

  handleDelete(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette réponse ?")) {
      this.reponseService.delete(id).subscribe({
        next: () => this.fetchResponses(),
        error: () => this.error = "Échec de la suppression de la réponse."
      });
    }
  }

  goToAdd(): void {
    this.router.navigate([`/admin/question/${this.questionId}/add-response`]);
  }

  goToModify(id: number): void {
    this.router.navigate([`/admin/question/${this.questionId}/modify-response/${id}`]);
  }
}
