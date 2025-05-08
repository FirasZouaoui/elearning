import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cours } from 'models/Cours';
import { Formation } from 'models/formation';
import { Test } from 'models/test';
import { Certificat } from 'models/Certificat';
import { forkJoin } from 'rxjs';
import { CoursService } from 'Services/cours.service';
import { FormationService } from 'Services/formation.service';
import { TestService } from 'Services/test.service';
import { CertificatService } from 'Services/certificat.service';
import { AuthService } from 'Services/auth-service.service';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit {
  idFormation: number = 0;
  formation: Formation | null = null;
  coursList: Cours[] = [];
  testList: Test[] = [];
  error: string = '';
  loading: boolean = true;
  userId: string | null = null;
  completedTestIds: Set<number> = new Set();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService,
    private coursService: CoursService,
    private testService: TestService,
    private certificatService: CertificatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('idFormation');
    if (!idParam || isNaN(+idParam)) {
      this.error = 'Identifiant de formation invalide.';
      this.loading = false;
      return;
    }
    this.idFormation = +idParam;
    this.userId = this.authService.userId;
    console.log('idFormation:', this.idFormation);
    console.log('userId:', this.userId);

    if (!this.userId) {
      this.error = 'Utilisateur non authentifié. Veuillez vous connecter.';
      this.loading = false;
      this.router.navigate(['/login']);
      return;
    }

    this.loadAllData();
  }

  loadAllData() {
    this.loading = true;
    forkJoin([
      this.formationService.getFormationById(this.idFormation),
      this.coursService.getByFormation(this.idFormation),
      this.testService.getTestsByFormationId(this.idFormation),
      this.certificatService.getByUserId(this.userId!)
    ]).subscribe({
      next: ([formation, cours, tests, certificates]) => {
        console.log('Formation:', formation);
        console.log('Cours:', cours);
        console.log('Tests:', tests);
        console.log('Certificates:', certificates);

        this.formation = formation;
        this.coursList = cours ?? [];
        this.testList = tests ?? [];

        // Map test IDs from certificates
        this.completedTestIds = new Set(
          certificates
            .map((cert: Certificat) => {
              if (typeof cert.testId === 'number') {
                return cert.testId; // Direct number
              } else if (cert.testId && 'idTest' in cert.testId) {
                return cert.testId.idTest; // Test object with idTest
              }
              return undefined;
            })
            .filter((id): id is number => id !== undefined)
        );

        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur API:', err);
        this.error =
          err.status === 401
            ? 'Accès non autorisé. Veuillez vous reconnecter.'
            : 'Erreur lors du chargement des données. Vérifiez votre connexion ou contactez l\'administrateur.';
        this.loading = false;
      }
    });
  }

  goToCours(id: number) {
    this.router.navigate(['/view-cours', id]);
  }

  passTest(id: number) {
    this.router.navigate(['/passertest', id]);
  }

  hasCompletedTest(testId: number): boolean {
    return this.completedTestIds.has(testId);
  }
}