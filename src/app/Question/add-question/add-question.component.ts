import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'Services/question.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  form!: FormGroup;
  error: string = '';
  testId!: number;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('testId'));

    this.form = this.fb.group({
      texte: ['', Validators.required],
      nbReponseVrai: [0, [Validators.required, Validators.min(0)]],
      note: [0, [Validators.required, Validators.min(0)]],
      temps: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      testId: this.testId
    };

    this.questionService.createQuestion(payload).subscribe({
      next: () => {
        this.router.navigate([`/admin/test/${this.testId}/questions`]);
      },
      error: () => {
        this.error = 'Failed to add question';
      }
    });
  }
}
