import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ Corrigé ici
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminFormationComponent } from './formations/admin-formation/admin-formation.component';
import { UserFormationComponent } from './formations/user-formation/user-formation.component';
import { AddFormationComponent } from './formations/add-formation/add-formation.component';
import { EditFormationComponent } from './formations/edit-formation/edit-formation.component';
import { TestListComponent } from './test/test-list/test-list.component';
import { EditTestComponent } from './test/edit-test/edit-test.component';
import { AddTestComponent } from './test/add-test/add-test.component';
import { ListCoursComponent } from './cours/list-cours/list-cours.component';
import { AddCoursComponent } from './cours/add-cours/add-cours.component';
import { EditCoursComponent } from './cours/edit-cours/edit-cours.component';
import { ViewCoursComponent } from './cours/view-cours/view-cours.component';
import { SafeUrlPipe } from './safe-url.pipe';
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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AdminFormationComponent,
    UserFormationComponent,
    AddFormationComponent,
    EditFormationComponent,
    TestListComponent,
    EditTestComponent,
    AddTestComponent,
    ListCoursComponent,
    AddCoursComponent,
    EditCoursComponent,
    ViewCoursComponent ,
    SafeUrlPipe,
    TestQuestionsComponent,
    AddQuestionComponent,
    ModifyQuestionComponent,
    QuestionResponsesComponent,
    AddResponseComponent,
    ModifyResponseComponent,
    FormationListComponent,
    FormationDetailComponent,
    PassTestComponent,
    DashbordComponent,
    AboutComponent,
    UserDashboardComponent,
   
    
    
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,
    RouterModule ,JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: [], // si tu veux filtrer les domaines
      },
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
