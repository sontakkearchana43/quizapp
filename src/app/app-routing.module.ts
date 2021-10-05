import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { AuthGuardService } from './auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
}, {
  path: 'signup',
  component: SignupComponent,
}, {
  path: 'quiz',
  component: QuizComponent,
  canActivate:[AuthGuardService],
},{
  path: 'leader-board',
  component: LeaderBoardComponent,
  canActivate:[AuthGuardService]
}, {
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: '/login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
