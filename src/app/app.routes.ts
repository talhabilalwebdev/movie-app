import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MovieDetailsResolver } from './resolvers/movie-details.resolver';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const routes: Routes = [
  // LOGIN
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(c => c.LoginComponent),
    canLoad: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (auth.getAuthStatus()) {
          router.navigate(['/movies']); // redirect logged-in users
          return false;
        }
        return true;
      }
    ]
  },

  // REGISTER
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then(c => c.RegistrationComponent),
    canLoad: [
      () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        if (auth.getAuthStatus()) {
          router.navigate(['/movies']); // redirect logged-in users
          return false;
        }
        return true;
      }
    ]
  },

  // MOVIES LIST
  {
    path: 'movies',
    loadComponent: () =>
      import('./movies/movie-list/movie-list.component').then(c => c.MovieListComponent),
    canActivate: [AuthGuard],
  },

  // MOVIE DETAILS
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./movies/movie-details/movie-details.component').then(c => c.MovieDetailsComponent),
    canActivate: [AuthGuard],
    resolve: { movie: MovieDetailsResolver },
  },

  // ROOT REDIRECT
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // CATCH-ALL
  { path: '**', redirectTo: 'login' },
];
