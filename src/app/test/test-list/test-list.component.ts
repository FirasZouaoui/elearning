import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'models/formation';
import { FormationService } from 'Services/formation.service';
import { TestService } from 'Services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  tests: any[] = [];
  filteredTests: any[] = [];
  searchTerm: string = '';
  selectedFormation: string = '';
  formations: Formation[] = [];
  error: string = '';

  constructor(
    private testService: TestService,
private formationService: FormationService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFormations();
    this.fetchTests();
  }

  // Récupérer tous les tests
  fetchTests() {
    this.testService.getAllTests().subscribe({
      next: (data) => {
        this.tests = data;
        this.filteredTests = data;
      },
      error: () => {
        this.error = 'Failed to fetch tests';
      }
    });
  }

  // Récupérer les tests par formation
  fetchTestsByFormation(formationId: string) {
    const id = Number(formationId);  // Convertir en nombre
    if (isNaN(id)) {
      this.error = 'Invalid formation ID';
      return;
    }
    this.testService.getTestsByFormationId(id).subscribe({
      next: (data) => {
        this.tests = data;
        this.filterTests();  // Appliquer le filtre sur les tests récupérés
      },
      error: (err) => {
        console.error('Error fetching tests for this formation', err);
        this.error = 'Error fetching tests for this formation';
      }
    });
  }

  // Récupérer les formations
  fetchFormations() {
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data;
      },
      error: () => {
        this.error = 'Failed to fetch formations';
      }
    });
  }

  // Supprimer un test
  handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this test?')) {
      this.testService.deleteTest(id).subscribe({
        next: () => {
          this.fetchTests();  // Récupérer à nouveau les tests après suppression
        },
        error: () => {
          this.error = 'Failed to delete test';
        }
      });
    }
  }

  // Gérer le changement dans le champ de recherche
  handleSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterTests();
  }

  // Gérer la sélection de formation
  handleFormationChange(event: any) {
    this.selectedFormation = event.target.value;
    if (this.selectedFormation) {
      this.fetchTestsByFormation(this.selectedFormation);
    } else {
      this.fetchTests();  // Récupérer tous les tests si aucune formation n'est sélectionnée
    }
  }

  // Appliquer les filtres sur les tests
  filterTests() {
    let filtered = this.tests;

    // Filtrer par nom
    if (this.searchTerm) {
      filtered = filtered.filter(test =>
        test.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filtrer par formation
    if (this.selectedFormation) {
      filtered = filtered.filter(test =>
        test.formation?.idFormation == Number(this.selectedFormation)  // Comparer avec un nombre
      );
    }

    this.filteredTests = filtered;
  }

  // Aller modifier un test
  goToModify(id: number) {
    this.router.navigate([`/admin/modify-test/${id}`]);
  }

  // Aller aux questions d'un test
  goToQuestions(id: number) {
    this.router.navigate([`/admin/test/${id}/questions`]);
  }
}
