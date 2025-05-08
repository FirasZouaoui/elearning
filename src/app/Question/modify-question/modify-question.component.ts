import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify-question',
  templateUrl: './modify-question.component.html',
  styleUrls: ['./modify-question.component.css']
})
export class ModifyQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  error: string = '';
  questionId!: number;
  testId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));

    this.questionForm = this.fb.group({
      texte: ['', Validators.required],
      nbReponseVrai: [0, [Validators.required, Validators.min(0)]],
      note: [0, [Validators.required, Validators.min(0)]],
      temps: [0, [Validators.required, Validators.min(0)]]
    });

    this.fetchQuestion();
  }

  fetchQuestion() {
    this.http.get<any>(`http://localhost:5287/api/Question/${this.questionId}`).subscribe({
      next: (data) => {
        this.questionForm.patchValue(data);
      },
      error: () => {
        this.error = 'Failed to fetch question details';
      }
    });
  }

  onSubmit() {
    if (this.questionForm.invalid) return;

    const payload = {
      ...this.questionForm.value,
      testId: this.testId,
      nbReponseVrai: Number(this.questionForm.value.nbReponseVrai),
      note: Number(this.questionForm.value.note),
      temps: Number(this.questionForm.value.temps)
    };

    this.http.put(`http://localhost:5287/api/Question/${this.questionId}`, payload).subscribe({
      next: () => {
        this.router.navigate([`/admin/test/${this.testId}/questions`]);
      },
      error: () => {
        this.error = 'Failed to update question';
      }
    });
  }
}
