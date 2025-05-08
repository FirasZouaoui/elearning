


import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { CoursService } from 'Services/cours.service';
import { FormationService } from 'Services/formation.service';
import { TestService } from 'Services/test.service';
import { AuthService } from 'Services/auth-service.service';
import { CertificatService } from 'Services/certificat.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  courseChart: Chart | undefined;
  testChart: Chart | undefined;
  userRoleChart: Chart | undefined;
  certificateChart: Chart | undefined;
  formations: any[] = [];
  users: any[] = [];
  tests: any[] = [];

  constructor(
    private coursService: CoursService,
    private formationService: FormationService,
    private testService: TestService,
    private authService: AuthService,
    private certificatService: CertificatService
  ) {}

  ngOnInit(): void {
    this.loadChartData();
    this.loadUserData();
    this.loadCertificateData();
  }

  loadChartData(): void {
    this.formationService.getFormations().subscribe(formations => {
      this.formations = formations;

      const courseObservables = this.formations.map(formation =>
        this.coursService.getByFormation(formation.idFormation)
      );

      const testObservables = this.formations.map(formation =>
        this.testService.getTestsByFormationId(formation.idFormation)
      );

      forkJoin(courseObservables).subscribe(courseResults => {
        const courseCounts = this.calculateCourseCounts(courseResults);
        this.createCourseDoughnutChart(courseCounts);
      });

      forkJoin(testObservables).subscribe(testResults => {
        const testCounts = this.calculateTestCounts(testResults);
        this.createTestBarChart(testCounts);
      });
    });
  }

  loadUserData(): void {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
      this.createUserRoleBarChart();
    });
  }

  loadCertificateData(): void {
    // Load both tests and certificates together
    forkJoin({
      tests: this.testService.getAllTests(),
      certificates: this.certificatService.getAll()
    }).subscribe(({ tests, certificates }) => {
      this.tests = tests;
      this.createCertificatePieChart(certificates);
    });
  }

  calculateCourseCounts(courseResults: any[][]): { label: string, data: number }[] {
    return this.formations.map((formation, index) => ({
      label: formation.nom,
      data: courseResults[index].length
    }));
  }

  calculateTestCounts(testResults: any[][]): { label: string, data: number }[] {
    return this.formations.map((formation, index) => ({
      label: formation.nom,
      data: testResults[index].length
    }));
  }

  createCourseDoughnutChart(courseCounts: { label: string, data: number }[]): void {
    const ctx = document.getElementById('courseChart') as HTMLCanvasElement;
    if (this.courseChart) {
      this.courseChart.destroy();
    }

    const data = {
      labels: courseCounts.map(item => item.label),
      datasets: [{
        label: 'Nombre de cours',
        data: courseCounts.map(item => item.data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    };

    this.courseChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Nombre de cours par formation' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value} cours`;
              }
            }
          }
        }
      }
    });
  }

  createTestBarChart(testCounts: { label: string, data: number }[]): void {
    const ctx = document.getElementById('testChart') as HTMLCanvasElement;
    if (this.testChart) {
      this.testChart.destroy();
    }

    const data = {
      labels: testCounts.map(item => item.label),
      datasets: [{
        label: 'Nombre de tests',
        data: testCounts.map(item => item.data),
        backgroundColor: [
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    };

    this.testChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Nombre de tests par formation' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value} tests`;
              }
            }
          }
        },
        scales: {
          x: { title: { display: true, text: 'Formations' } },
          y: { beginAtZero: true, title: { display: true, text: 'Nombre de tests' } }
        }
      }
    });
  }

  createUserRoleBarChart(): void {
    const ctx = document.getElementById('userRoleChart') as HTMLCanvasElement;
    if (this.userRoleChart) {
      this.userRoleChart.destroy();
    }

    let userCount = 0;
    let adminCount = 0;
    this.users.forEach(user => {
      if (user.roles.includes('User')) userCount++;
      if (user.roles.includes('Admin')) adminCount++;
    });

    const data = {
      labels: ['Utilisateurs', 'Administrateurs'],
      datasets: [{
        label: 'Nombre par rôle',
        data: [userCount, adminCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    this.userRoleChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Nombre d\'utilisateurs et administrateurs' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: { title: { display: true, text: 'Rôles' } },
          y: { beginAtZero: true, title: { display: true, text: 'Nombre' } }
        }
      }
    });
  }

  createCertificatePieChart(certificates: any[]): void {
    const ctx = document.getElementById('certificateChart') as HTMLCanvasElement;
    if (this.certificateChart) {
      this.certificateChart.destroy();
    }

    // Compter les certificats par test
    const certificateCounts = this.tests.map(test => {
      const count = certificates.filter(cert => cert.test?.idTest === test.idTest).length;
      return {
        label: test.nom,
        data: count
      };
    }).filter(item => item.data > 0); // Filtrer les tests sans certificats

    const data = {
      labels: certificateCounts.map(item => item.label),
      datasets: [{
        label: 'Nombre de certificats',
        data: certificateCounts.map(item => item.data),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    this.certificateChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Nombre de certificats par test' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value} certificats`;
              }
            }
          }
        }
      }
    });
  }
}