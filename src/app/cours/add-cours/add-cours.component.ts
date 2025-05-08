import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'Services/cours.service';
import { FormationService } from 'Services/formation.service';
import { Cours } from 'models/Cours';
import { Formation } from 'models/formation';

@Component({
  selector: 'app-add-cours',
  templateUrl: './add-cours.component.html',
  styleUrls: ['./add-cours.component.css']
})
export class AddCoursComponent implements OnInit {
  cours: {
    titre?: string;
    idFormation?: number;
    youtubeLink?: string;
  } = {};

  formations: Formation[] = [];
  error: string = '';

  constructor(
    private coursService: CoursService,
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFormations();
  }

  fetchFormations(): void {
    this.formationService.getFormations().subscribe({
      next: (data) => (this.formations = data),
      error: () => (this.error = 'Erreur lors du chargement des formations')
    });
  }

  handleSubmit(): void {
    if (!this.cours.titre || !this.cours.idFormation || !this.cours.youtubeLink) {
      this.error = 'Veuillez remplir tous les champs.';
      return;
    }

    const newCours: Cours = {
      idCours: 0, // requis par le modèle
      titre: this.cours.titre,
      idFormation: this.cours.idFormation,
      youtubeLink: this.cours.youtubeLink
    };

    this.coursService.create(newCours).subscribe({
      next: () => this.router.navigate(['/admin/cours']),
      error: () => (this.error = 'Erreur lors de l\'ajout du cours')
    });
  }
}
