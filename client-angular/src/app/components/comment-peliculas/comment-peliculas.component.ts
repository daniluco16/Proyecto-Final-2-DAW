import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { User } from '../../models/user';
import { Movie } from 'src/app/models/movie';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from '../../services/user.service';
import { tmdbService } from '../../services/tmdb.service';
import { identity } from 'rxjs';

@Component({
  selector: 'app-comment-peliculas',
  templateUrl: './comment-peliculas.component.html',
  styleUrls: ['./comment-peliculas.component.css'],
  providers: [UserService, tmdbService]

})
export class CommentPeliculasComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public movie: Movie; 
  public comment: Comment; 
  public comments: Array<Comment>;
  public status: string;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _tmdbService: tmdbService,


  ) {

    this.title = 'Commentarios de peliculas';
    
    

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    

   }

  ngOnInit() {

    if(this.identity == null){

      this._router.navigate(["/login"]);

    }else{

      //Crear objeto user

      this.comment = new Comment(1, 1, 1, '', '');

    }

    this.getMovie();
    this.comment.User_id = this.identity.sub;
    this.getComments();

  }

  getMovie(){

    this._route.params.subscribe(params => {

      let id = +params['id'];

      this._tmdbService.getDetalleMovie(id).subscribe(

        response => {


            this.movie = response;

            this.movie.poster_path = GLOBAL.urlimage + "w300" + this.movie.poster_path;

            this.movie.id = response.id;
      
            this.comment.Film_id = this.movie.id;

          

        },
        error => {

            console.log(error);

        }

      );

    });

  }

  getComments(){
   this._route.params.subscribe(params => {

    let id = +params['id'];

    this._userService.listarComment(id).subscribe(

      response => {

          this.comments = response;

          console.log(response);

      },
      error => {

        console.log(error);

      }
    );

   }); 
   
  }

  deleteComment(id){

    this._userService.deleteComment(this.token, id).subscribe(

      response => {

        this.getComments();

      },
      error => {

        console.log(<any>error);
      }
    );
  }

  onSubmit(form){

    this._userService.crearComment(this.token, this.comment).subscribe(

      response => {

        console.log("entro"+response);

        if (response.status == 'success') {

          this.status = response.status;

          //Vaciar el formulario

          // this.comment = new Comment(1, 1, 1, '', '');

          form.reset();

          this.getComments();

        } else {


          this.status = 'error';

        }
      },
      error => {

        console.log(<any>error);

        this.status = 'error';
      }
    );
  }
}
