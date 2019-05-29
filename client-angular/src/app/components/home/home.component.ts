import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Favorite } from 'src/app/models/favorite';
import { DomSanitizer} from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { tmdbService } from '../../services/tmdb.service';
import { identity } from 'rxjs';
import { GLOBAL } from 'src/app/services/global';
import { query } from '@angular/core/src/render3';
import * as $ from 'jquery';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, tmdbService]
})
export class HomeComponent implements OnInit {

  public p: number = 1;


  public title: string;
  public key;
  public movie;
  public movies: Array<any>;
  public favorite: Favorite;
  public token;
  public identity;
  public input: string = '';
  public status;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tmdbService: tmdbService,
    private sanitizer: DomSanitizer


  ) {
    this.title = 'Home';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }


  ngOnInit() {

    if(this.identity == null){

      this._router.navigate(['/login']);

    }
    
    this.getPeliculas();

  }


  getPeliculas(){

    this._tmdbService.searchMovies(2019).subscribe(

      response => {

        this.movies = response['results'];

        this.movies.forEach(movie => {

          movie.poster_path = GLOBAL.urlimage+"w200"+movie.poster_path;

        });
      },
      error => {

        console.log(error);

      }
     );
  }

  addFavorite(idfilm){

    this._userService.crearFavorite({'Film_id' : idfilm, 'User_id' : this.identity.sub}).subscribe(

      response => {

        console.log(response);

        if(response.status == 'success'){

          

          this.status = response.status;

        }else{

          this.status = 'error';

        }
      },
      error => {

        console.log(error);

        this.status = 'error';
      }
    );
  }

  onSubmit(form){

    if(this.input != ''){

      this._tmdbService.findMovies(this.input).subscribe(

        response => {
  
          console.log(response);
  
          this.movies = response['results'];
  
          this.movies.forEach(movie => {
  
            movie.poster_path = GLOBAL.urlimage+"w200"+movie.poster_path;
  
          });
  
        },
        error => {
  
          console.log(error);
  
        }
  
      );

    }else{

      this.getPeliculas();

    }
  }
}
