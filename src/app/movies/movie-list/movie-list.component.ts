import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbar } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HttpClientModule, RouterModule, MatProgressSpinnerModule, MatTooltipModule, MatPaginatorModule,FormsModule, 
    MatToolbar, MatFormFieldModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  isLoading = false;
  errorMessage = '';
  totalResults = 0;  // total movies from API
  pageSize = 20;     // movies per page (TMDb default)
  currentPage = 1;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.loadMovies(this.currentPage);
  }

  loadMovies(page: number) {
    this.isLoading = true;
    this.errorMessage = '';
    this.movieService.getPopularMovies(page).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.totalResults = data.total_results;
        this.pageSize = data.results.length; // usually 20
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load movies.';
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1; // paginator pages start at 0
    this.loadMovies(this.currentPage);
  }
  searchTerm: string = '';

  onSearch() {
    console.log('Searching for:', this.searchTerm);
    // Add your actual search logic here
  }
  
}
