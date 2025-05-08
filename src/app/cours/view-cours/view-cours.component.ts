import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'Services/cours.service';
import { Cours } from 'models/Cours';

@Component({
  selector: 'app-view-cours',
  templateUrl: './view-cours.component.html',
  styleUrls: ['./view-cours.component.css']
})
export class ViewCoursComponent implements OnInit {
  cours?: Cours;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private coursService: CoursService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.coursService.getById(id).subscribe({
        next: (data) => this.cours = data,
        error: () => this.error = 'Erreur lors du chargement du cours.'
      });
    }
  }

  getYouTubeEmbedUrl(youtubeLink: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = youtubeLink.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }
}
