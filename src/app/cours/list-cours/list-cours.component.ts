import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cours } from 'models/Cours';
import { CoursService } from 'Services/cours.service';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  cours: Cours[] = [];
  error: string = '';

  constructor(
    private coursService: CoursService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadCours();
  }

  loadCours(): void {
    this.coursService.getAll().subscribe({
      next: data => this.cours = data,
      error: err => this.error = "Erreur lors du chargement des cours"
    });
  }

  deleteCours(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      this.coursService.delete(id).subscribe({
        next: () => this.loadCours(),
        error: err => this.error = "Erreur lors de la suppression du cours"
      });
    }
  }
}
