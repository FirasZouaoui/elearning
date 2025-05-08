import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'Services/formation.service';

// Interface pour typage strict
interface Formation {
  idFormation: number;
  nom: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {
  formations: Formation[] = [];
  error: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 3;

  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFormations();
  }

  getFormations(): void {
    this.formationService.getPaginatedFormations(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        console.log('Formations:', data);
        this.formations = data.items ?? [];
        this.totalPages = data.totalPages ?? 1;
      },
      error: (err) => {
        console.error('Erreur récupération formations:', err);
        this.error = 'Une erreur est survenue lors de la récupération des formations.';
      }
    });
  }

  goToFormation(id: number): void {
    this.router.navigate(['/formation', id]);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.getFormations();
  }
}