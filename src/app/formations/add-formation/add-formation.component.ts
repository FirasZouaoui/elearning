import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from 'Services/formation.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent {
  formation = { nom: '', description: '', duree: 0 };
  imageFile: File | null = null;
  error: string = '';

  constructor(private formationService: FormationService, private router: Router) {}

  handleFileInput(event: any) {
    this.imageFile = event.target.files[0];
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('nom', this.formation.nom);
    formData.append('description', this.formation.description);
    formData.append('duree', this.formation.duree.toString());

    if (this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    this.formationService.addFormation(formData).subscribe({
      next: () => this.router.navigate(['/admin/formations']),
      error: () => this.error = 'Failed to add formation'
    });
  }
}
