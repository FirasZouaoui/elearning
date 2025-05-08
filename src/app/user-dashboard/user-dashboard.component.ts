
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Certificat } from 'models/Certificat';
import { Test } from '../../../models/test';
import { Formation } from 'models/formation';
import { AuthService } from 'Services/auth-service.service';
import { CertificatService } from 'Services/certificat.service';
import { TestService } from 'Services/test.service';
import { FormationService } from 'Services/formation.service';
import { forkJoin, switchMap } from 'rxjs';
import { saveAs } from 'file-saver';
import * as pdfMake from 'pdfmake/build/pdfmake';

interface CertificateDisplay {
  idCertificat: number;
  userName: string; // Placeholder for display; actual name entered for PDF
  testName: string;
  formationName: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  certificates: CertificateDisplay[] = [];
  loading: boolean = true;
  error: string = '';
  userId: string | null = null;

  constructor(
    private authService: AuthService,
    private certificatService: CertificatService,
    private testService: TestService,
    private formationService: FormationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userId;
    if (!this.userId) {
      this.error = 'Utilisateur non authentifié. Veuillez vous connecter.';
      this.loading = false;
      this.router.navigate(['/login']);
      return;
    }
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.loading = true;
    this.certificatService.getByUserId(this.userId!).subscribe({
      next: (certificates: Certificat[]) => {
        if (certificates.length === 0) {
          this.certificates = [];
          this.loading = false;
          return;
        }

        // Fetch test and formation details
        const testObservables = certificates.map(cert => {
          const testId = typeof cert.testId === 'number' ? cert.testId : cert.testId?.idTest;
          if (testId === undefined) {
            throw new Error('Invalid testId');
          }
          return this.testService.getTestById(testId);
        });

        const formationObservables = certificates.map(cert => {
          const testId = typeof cert.testId === 'number' ? cert.testId : cert.testId?.idTest;
          if (testId === undefined) {
            throw new Error('Invalid testId');
          }
          return this.testService.getTestById(testId).pipe(
            switchMap(test => this.formationService.getFormationById(test.formationId))
          );
        });

        // Resolve all observables
        forkJoin({
          tests: forkJoin(testObservables),
          formations: forkJoin(formationObservables)
        }).subscribe({
          next: ({ tests, formations }) => {
            this.certificates = certificates.map((cert, index) => ({
              idCertificat: cert.idCertificat,
              userName: 'Utilisateur', // Placeholder for display
              testName: tests[index].nom,
              formationName: formations[index].nom
            }));
            this.loading = false;
          },
          error: (err) => {
            console.error('Erreur lors du chargement des détails:', err);
            this.error = 'Erreur lors du chargement des certificats.';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement des certificats:', err);
        this.error = 'Erreur lors du chargement des certificats.';
        this.loading = false;
      }
    });
  }

  downloadCertificate(certificate: CertificateDisplay): void {
    // Prompt user for their name
    const userName = window.prompt('Veuillez entrer votre nom pour le certificat:');
    if (!userName) {
      this.error = 'Nom requis pour générer le certificat.';
      return;
    }

    // Define pdfmake document
    const documentDefinition: any = {
      content: [
        // Spacer
        {
          text: '',
          margin: [0, 20, 0, 20]
        },
        // Header image
        {
          image: 'headerImage',
          width: 400,
          alignment: 'center',
          fallback: { text: 'Logo IIT', style: 'title' }
        },
        // Spacer
        {
          text: '',
          margin: [0, 20, 0, 20]
        },
        // Title
        {
          text: "Certificat d'Achèvement",
          style: 'title',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 10, 0, 10]
        },
        // Subtitle: Décerné à
        {
          text: 'Décerné à',
          style: 'subtitle',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 10, 0, 10]
        },
        // User name
        {
          text: userName.trim(),
          style: 'name',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 10, 0, 10]
        },
        // Subtitle: pour avoir complété
        {
          text: 'pour avoir complété avec succès',
          style: 'subtitle',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 10, 0, 10]
        },
        // Test name
        {
          text: certificate.testName,
          style: 'subheader',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 10, 0, 10]
        },
        // Subtitle: dans le cadre de la formation
        {
          text: 'dans le cadre de la formation',
          style: 'subtitle',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 10, 0, 10]
        },
        // Formation name
        {
          text: certificate.formationName,
          style: 'subheader',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 20, 0, 20]
        },
        // Date
        {
          text: `Délivré le ${new Date().toLocaleDateString('fr-FR')}`,
          style: 'subtitle',
          alignment: 'center'
        },
        // Spacer
        {
          text: '',
          margin: [0, 20, 0, 20]
        },
        // Signature
        {
          text: 'Signature: ________________________',
          style: 'subtitle',
          alignment: 'center'
        }
      ],
      images: {
        headerImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftn.linkedin.com%2Fcompany%2Fiitsfax&psig=AOvVaw2050WZz1p_i4I4HA6qPC5d&ust=1746746192508000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNCgo-S-ko0DFQAAAAAdAAAAABAI'
      },
      styles: {
        title: {
          fontSize: 36,
          bold: true,
          color: '#003366' // titleblue
        },
        subheader: {
          fontSize: 20,
          bold: true,
          color: '#333333' // textgray
        },
        subtitle: {
          fontSize: 16,
          italic: true,
          color: '#333333'
        },
        name: {
          fontSize: 28,
          bold: true,
          color: '#333333'
        }
      },
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        font: 'Roboto'
      }
    };

    try {
      // Generate and download PDF
      pdfMake.createPdf(documentDefinition).download(`Certificate_${certificate.testName}.pdf`);
    } catch (err) {
      console.error('Erreur lors de la génération du PDF:', err);
      this.error = 'Erreur lors de la génération du certificat PDF.';
    }
  }
}