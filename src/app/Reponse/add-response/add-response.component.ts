import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReponseService } from 'Services/reponse.service';
import { Reponse } from 'models/Reponse';

@Component({
  selector: 'app-add-response',
  templateUrl: './add-response.component.html',
  styleUrls: ['./add-response.component.css']
})
export class AddResponseComponent implements OnInit {
  questionId!: number;
  reponse: Reponse = {
    idReponse: 0,
    texte: '',
    estCorrecte: 0,
    questionId: 0,
    note: 0
  };
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    this.reponse.questionId = this.questionId;
  }

  onSubmit(): void {
    // s'assurer que estCorrecte est 0 ou 1
    this.reponse.estCorrecte = this.reponse.estCorrecte ? 1 : 0;
    this.reponse.note = Number(this.reponse.note);

    this.reponseService.add(this.reponse).subscribe({
      next: () => {
        this.router.navigate([`/admin/question/${this.questionId}/responses`]);
      },
      error: () => {
        this.error = 'Échec de l\'ajout de la réponse';
      }
    });
  }
}
