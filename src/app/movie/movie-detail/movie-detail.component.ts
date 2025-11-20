import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from '../Movie';
import { movieService } from '../movie.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | any = null;
  safeTrailerUrl: SafeResourceUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: movieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const idParam = params.get('id');
          const id = idParam ? Number(idParam) : NaN;
          if (!isNaN(id)) {
            return this.movieService.Getmovie(id);
          }
          return of(null);
        })
      )
      .subscribe((movie) => {
        this.movie = movie;
        this.updateTrailerUrl();
      });
  }

  private updateTrailerUrl(): void {
    if (this.movie?.trailer_url) {
      // Convertir URL de YouTube watch a embed si es necesario
      let embedUrl = this.movie.trailer_url;
      if (embedUrl.includes('watch?v=')) {
        embedUrl = embedUrl.replace('watch?v=', 'embed/');
      }
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      this.safeTrailerUrl = null;
    }
  }
}