import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminFormationComponent } from './formations/admin-formation/admin-formation.component';
import { UserFormationComponent } from './formations/user-formation/user-formation.component';
import { AddFormationComponent } from './formations/add-formation/add-formation.component';
import { EditFormationComponent } from './formations/edit-formation/edit-formation.component';
import { TestListComponent } from './test/test-list/test-list.component';
import { AddTestComponent } from './test/add-test/add-test.component';
import { EditTestComponent } from './test/edit-test/edit-test.component';
import { ListCoursComponent } from './cours/list-cours/list-cours.component';
import { AddCoursComponent } from './cours/add-cours/add-cours.component';
import { EditCoursComponent } from './cours/edit-cours/edit-cours.component';
import { ViewCoursComponent } from './cours/view-cours/view-cours.component';
import { TestQuestionsComponent } from './Question/test-questions/test-questions.component';
import { AddQuestionComponent } from './Question/add-question/add-question.component';
import { ModifyQuestionComponent } from './Question/modify-question/modify-question.component';
import { QuestionResponsesComponent } from './Reponse/question-responses/question-responses.component';
import { AddResponseComponent } from './Reponse/add-response/add-response.component';
import { ModifyResponseComponent } from './Reponse/modify-response/modify-response.component';
import { FormationListComponent } from './Publice/formation-list/formation-list.component';
import { FormationDetailComponent } from './Publice/formation-detail/formation-detail.component';
import { PassTestComponent } from './Publice/pass-test/pass-test.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AboutComponent } from './about/about.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'login', component: LoginComponent } // si Login existe
  { path: 'login', component: LoginComponent },
  { path: 'admin/formations', component: AdminFormationComponent },
  { path: 'user/formations', component: UserFormationComponent },
  { path: 'admin/formations/add', component: AddFormationComponent },
  { path: 'admin/formations/edit/:id', component: EditFormationComponent },
  { path: 'admin/Tests', component: TestListComponent  },
  { path: 'admin/add-test', component: AddTestComponent },
  { path: 'admin/modify-test/:id', component: EditTestComponent }, // ✅ route pour modifier un test
  { path: 'admin/cours', component: ListCoursComponent }, // ✅ route pour modifier un test
  { path: 'add-cours', component: AddCoursComponent }, // ✅ route pour modifier un test
  { path: 'cours/edit/:id', component: EditCoursComponent },
  { path: 'view-cours/:id', component: ViewCoursComponent },
  { path: 'admin/test/:testId/questions', component: TestQuestionsComponent },
  { path: 'admin/test/:testId/add-question', component: AddQuestionComponent },
  { path: 'admin/test/:testId/modify-question/:questionId', component: ModifyQuestionComponent },
  {  path: 'admin/question/:questionId/responses', component: QuestionResponsesComponent },
  { path: 'admin/question/:questionId/add-response', component: AddResponseComponent },
  { path: 'admin/question/:questionId/modify-response/:responseId', component: ModifyResponseComponent }, // modification
  { path: 'ListeFormationPubli', component: FormationListComponent }, // modification

  { path: 'formation/:idFormation', component: FormationDetailComponent },
  { path: 'passertest/:id', component: PassTestComponent }, // Route for PassTestComponent
 
  { path: 'admin/dashboard', component: DashbordComponent }, // Route for PassTestComponent
  { path: 'about', component: AboutComponent },
  { path: 'MESC', component: UserDashboardComponent },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
