import { Component, OnInit } from '@angular/core';
import { Formation } from 'models/formation';
import { FormationService } from 'Services/formation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-formation',
  templateUrl: './admin-formation.component.html',
  styleUrls: ['./admin-formation.component.css']
})
export class AdminFormationComponent implements OnInit {
  formations: Formation[] = [];
  pageNumber = 1;
  pageSize = 5; // par exemple 5 par page
  totalPages = 1;

  constructor(private formationService: FormationService, private router: Router) {}

  ngOnInit(): void {
    this.loadFormations();
  }
  

  loadFormations() {
    this.formationService.getPaginatedFormations(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.formations = response.items;
        this.totalPages = response.totalPages;
      },
      error: (err) => console.error('Error loading formations', err)
    });
  }

  deleteFormation(id: number) {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.loadFormations();
      });
    }
  }

  editFormation(id: number) {
    this.router.navigate(['admin/formations/edit', id]);
  }
  navigateToAdd() {
    this.router.navigate(['admin/formations/add']);
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadFormations();
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadFormations();
    }
  }
}
