import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie';
import { UserService } from '../../services/user.service';
import { tmdbService } from '../../services/tmdb.service';
import { identity } from 'rxjs';
import { GLOBAL } from 'src/app/services/global';
import { query } from '@angular/core/src/render3';
import * as $ from 'jquery';


@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css'],
  providers: [UserService, tmdbService]
})

export class DetallePeliculaComponent implements OnInit{

  public titulo: string;
  public movie;
  public key;

  public token;
  public identity;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tmdbService: tmdbService,
    private sanitizer: DomSanitizer

  ) {
    this.titulo = 'Detalle de las películas';

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {

    if(this.identity == null){

      this._router.navigate(['/login']);


    }

    this.getDetail();

  }


  getDetail() {
    this._route.params.subscribe(

      params => {

        let id = +params['id'];

        this._tmdbService.getDetalleMovie(id).subscribe(

          response => {

            console.log(response);
              this.movie = response;

              this.movie.poster_path = GLOBAL.urlimage + "w200" + this.movie.poster_path;
  
              this.key = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.movie.videos.results[0].key);
           

          },
          error => {

            console.log(<any>error);

          }

        );

      }
    );
  }

}