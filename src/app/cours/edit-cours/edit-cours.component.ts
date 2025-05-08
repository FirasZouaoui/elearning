import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'models/Cours';
import { Formation } from 'models/formation';
import { CoursService } from 'Services/cours.service';
import { FormationService } from 'Services/formation.service';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css']
})
export class EditCoursComponent implements OnInit {
  cours: Cours = { idCours: 0, titre: '', idFormation: 0, youtubeLink: '' };
  formations: Formation[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private coursService: CoursService,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.coursService.getById(id).subscribe({
        next: data => this.cours = data,
        error: err => this.error = 'Erreur lors du chargement du cours'
      });
    }

    this.formationService.getFormations().subscribe({
      next: data => this.formations = data,
      error: err => this.error = 'Erreur lors du chargement des formations'
    });
  }

  updateCours(): void {
    this.coursService.update(this.cours.idCours, this.cours).subscribe({
      next: () => this.router.navigate(['/cours']),
      error: err => this.error = 'Erreur lors de la mise à jour du cours'
    });
  }
}
