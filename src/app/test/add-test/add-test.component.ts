import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'Services/formation.service';
import { TestService } from 'Services/test.service';
import { Formation } from 'models/formation';
import { Test } from 'models/test'; // Assure-toi que ce fichier existe

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  test: Partial<Test> = {
    nom: '',
    formationId: 0
  };

  formations: Formation[] = [];
  error: string = '';

  constructor(
    private testService: TestService,
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFormations();
  }

  fetchFormations(): void {
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des formations';
      }
    });
  }

  handleSubmit(): void {
    if (!this.test.nom || !this.test.formationId) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    const newTest: Test = {
      idTest: 0,
      nom: this.test.nom!,
      formationId: Number(this.test.formationId)
    };

    this.testService.createTest(newTest).subscribe({
      next: () => {
        this.router.navigate(['/admin/Tests']);
      },
      error: () => {
        this.error = 'Erreur lors de l\'ajout du test';
      }
    });
  }
}
