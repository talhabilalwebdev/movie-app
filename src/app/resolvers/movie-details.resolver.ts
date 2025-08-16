import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MovieService } from '../services/movie.service';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsResolver implements Resolve<any> {
  constructor(private movieService: MovieService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const movieId = route.paramMap.get('id');
    if (!movieId) {
      this.router.navigate(['/movies']);
      return EMPTY;
    }

    return this.movieService.getMovieDetails(movieId).pipe(
      catchError((error) => {
        // Navigate back on error or handle gracefully
        this.router.navigate(['/movies']);
        return EMPTY;
      })
    );
  }
}
