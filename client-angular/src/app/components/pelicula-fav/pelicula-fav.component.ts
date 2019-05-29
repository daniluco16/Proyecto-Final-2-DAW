import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { tmdbService } from '../../services/tmdb.service';
import { User } from '../../models/user';
import { Movie } from 'src/app/models/movie';
import { GLOBAL } from 'src/app/services/global';
import { Favorite } from 'src/app/models/favorite';
import { identity } from 'rxjs';

@Component({
  selector: 'app-pelicula-fav',
  templateUrl: './pelicula-fav.component.html',
  styleUrls: ['./pelicula-fav.component.css'],
  providers: [UserService, tmdbService]
})
export class PeliculaFavComponent implements OnInit {

  public p: number = 1;
  public cargando: boolean;

  public token;
  public identity;
  public movie: Movie; 
  public movies = [];
  public favorites: Array<Favorite>;
  public status: string;


  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tmdbService: tmdbService,


  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

    

   }

  ngOnInit() {
    this.cargando = true;
    if(this.identity == null){

      this._router.navigate(['/login']);


    }


    this.getFavorites(this.identity.sub);

  }

  deleteFavorite(Film_id){

    this._userService.deleteFavorito(Film_id).subscribe(

      response => {

          this.getFavorites(this.identity.sub);

      },
      error => {

        console.log(<any>error);
      }
    );
  }

  getFavorites(idUser){


    this._userService.listarFavoritos(idUser).subscribe(
      response => {

          this.cargando = false;


          this.favorites = response;
          
          console.log(this.favorites);

          this.getMovies(this.favorites);
          
      },
      error => {

        console.log(error);

      }
    );

  }

  getMovies(favorites){
  
    this.movies = [];

    favorites.forEach(favorite => {
      
      this._tmdbService.getDetalleMovie(favorite.Film_id).subscribe(
  
        response => {


            this.movie = response;

            this.movie.poster_path = GLOBAL.urlimage + "w300" + this.movie.poster_path;

            // this.movie.id = response.id;
      
            // this.favorite.Film_id = this.movie.id;

            this.movies.push(this.movie);
        },
        error => {

            console.log(error);

        }

      );

    });
        
  }

   
}


