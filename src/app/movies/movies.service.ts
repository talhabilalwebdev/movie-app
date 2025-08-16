import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey = 'YOUR_TMDB_API_KEY';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

 getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }
  
   getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`);
  }
}
