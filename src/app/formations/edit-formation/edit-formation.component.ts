import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from 'Services/formation.service';
import { Formation } from 'models/formation';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
  formation: Formation = { idFormation: 0, nom: '', description: '', duree: 0, imageUrl: '' };
  imageFile: File | null = null;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formationService.getFormationById(id).subscribe({
      next: (data) => this.formation = data,
      error: () => this.error = 'Failed to load formation'
    });
  }

  handleFileInput(event: any) {
    this.imageFile = event.target.files[0];
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('IdFormation', this.formation.idFormation.toString());
    formData.append('nom', this.formation.nom);
    formData.append('description', this.formation.description);
    formData.append('duree', this.formation.duree.toString());

    if (this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    this.formationService.updateFormation(this.formation.idFormation, formData).subscribe({
      next: () => this.router.navigate(['/admin/formations']),
      error: () => this.error = 'Failed to update formation'
    });
  }
}
