// src/app/resolvers/movie-details.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';

@Injectable({ providedIn: 'root' })
export class MovieDetailsResolver implements Resolve<any> {
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    if (!id) {
      return of(null);
    }
    return this.movieService.getMovieDetails(id).pipe(
      catchError((error) => {
        console.error('Error fetching movie details', error);
        return of(null); // or navigate to error page
      })
    );
  }
}
