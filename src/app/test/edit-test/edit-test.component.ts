import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'Services/test.service';
import { FormationService } from 'Services/formation.service';
import { Formation } from 'models/formation';
import { Test } from 'models/test';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css'],
})
export class EditTestComponent implements OnInit {
  test: Test = {
    idTest: 0,
    nom: '',
    formationId: 0, // La formationId au lieu de formation pour une structure plus simple
  };
  formations: Formation[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchFormations();
    this.fetchTest(id);
  }

  fetchTest(id: number): void {
    this.testService.getTestById(id).subscribe({
      next: (data) => {
        this.test = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du test:', err);
        this.error = 'Erreur lors du chargement du test';
      },
    });
  }

  fetchFormations(): void {
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des formations:', err);
        this.error = 'Erreur lors du chargement des formations';
      },
    });
  }

  handleSubmit(): void {
    if (!this.test.nom || !this.test.formationId) {
      this.error = 'Le nom et la formation sont obligatoires';
      return;
    }

    this.testService.updateTest(this.test).subscribe({
      next: () => {
        this.router.navigate(['/admin/tests']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du test:', err);
        this.error = 'Erreur lors de la mise à jour du test';
      },
    });
  }
}
