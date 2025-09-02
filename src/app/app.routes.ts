import { Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading';
import { IntroComponent } from './intro/intro';
import { AuthComponent } from './auth/auth';
import { UserDashboardComponent } from './user-dashboard/user-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  { path: 'loading', component: LoadingComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: UserDashboardComponent },
  
];