import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReponseService } from 'Services/reponse.service';
import { Reponse } from 'models/Reponse';

@Component({
  selector: 'app-modify-response',
  templateUrl: './modify-response.component.html',
  styleUrls: ['./modify-response.component.css']
})
export class ModifyResponseComponent implements OnInit {
  questionId!: number;
  responseId!: number;
  error: string = '';

  reponse: Reponse = {
    idReponse: 0,
    texte: '',
    estCorrecte: 0,
    questionId: 0,
    note: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.responseId = Number(this.route.snapshot.paramMap.get('responseId'));
    this.getReponse();
  }

  getReponse(): void {
    this.reponseService.getById(this.responseId).subscribe({
      next: (data: Reponse) => {
        this.reponse = {
          ...data,
          estCorrecte: data.estCorrecte === 1 ? 1 : 0
        };
      },
      error: () => {
        this.error = 'Échec du chargement des détails de la réponse';
      }
    });
  }

  onSubmit(): void {
    const updatedResponse: Reponse = {
      ...this.reponse,
      estCorrecte: this.reponse.estCorrecte ? 1 : 0,
      note: Number(this.reponse.note),
      questionId: this.questionId
    };

    this.reponseService.update(this.responseId, updatedResponse).subscribe({
      next: () => {
        this.router.navigate([`/admin/question/${this.questionId}/responses`]);
      },
      error: () => {
        this.error = 'Échec de la mise à jour de la réponse';
      }
    });
  }
}
