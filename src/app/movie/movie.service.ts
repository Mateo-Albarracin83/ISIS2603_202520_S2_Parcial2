import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Movie } from './Movie';
@Injectable({

  providedIn: 'root'
})
export class movieService{
    private readonly BASE_URL="https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies/movie.json"
    constructor(private http: HttpClient) {}
    Getmovies():Observable<Movie[]>{
        const url = `${this.BASE_URL}/recipe.json`;
		return this.http.get<Movie[]>(url);
        }
    
    Getmovie(id:Number):Observable<Movie>{
        const url = `${this.BASE_URL}/${id}/Movie.json`;
		return this.http.get<Movie>(url);

    }

    
}

