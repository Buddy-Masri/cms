import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPostsComponent } from './posts/new-posts/new-posts.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'subscribers',
    component: SubscribersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
  },
  { path: 'posts', component: AllPostsComponent, canActivate: [authGuard] },
  { path: 'posts/new', component: NewPostsComponent, canActivate: [authGuard] },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
