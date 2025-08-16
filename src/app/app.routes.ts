import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { MovieDetailsResolver } from './resolvers/movie-details.resolver';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'movies',
    loadComponent: () =>
      import('./movies/movie-list/movie-list.component').then(
        (c) => c.MovieListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./movies/movie-details/movie-details.component').then(
        (c) => c.MovieDetailsComponent
      ),
    canActivate: [AuthGuard],
    resolve: {
      movie: MovieDetailsResolver,
    },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
