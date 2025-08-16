import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service';

import { MatCardModule } from '@angular/material/card';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieCredits: any;
  genres: any;
  isLoading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.isLoading = true;
      this.movieService.getMovieDetails(movieId).subscribe({
        next: (data) => {
          // console.log('genres:', data.genres);
           console.log('Movie details fetched:', data); 
          //   console.log('Movie details fetched:', data.title); 
          this.movie = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load movie details. Please try again later.';
          this.isLoading = false;
        },
      });
    }
    
  }
}
