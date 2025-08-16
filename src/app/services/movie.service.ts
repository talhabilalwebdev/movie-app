import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '5328178abe87ca6a9fd0cc4d5ed11a65'; // Replace with your TMDb API key
  private apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
  baseUrl: any;

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<any> {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=${page}`;
  return this.http.get<any>(url);
}

  getMovieDetails(id: string): Observable<any> {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`;
  return this.http.get<any>(url);
}

 getMovieCredits(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }



}
