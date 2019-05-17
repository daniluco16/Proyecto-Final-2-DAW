import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { UserService } from '../../services/user.service';
import { identity } from 'rxjs';

@Component({
  selector: 'app-comment-peliculas',
  templateUrl: './comment-peliculas.component.html',
  styleUrls: ['./comment-peliculas.component.css'],
  providers: [UserService]

})
export class CommentPeliculasComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public comment: Comment; 
  public status: string;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {

    this.title = 'Commentarios de peliculas';
    
    

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

   }

  ngOnInit() {

    if(identity == null){

      this._router.navigate(['/login']);

    }

    console.log('commentPeliculas.component cargado correctamente');

    if(this.identity == null){

      this._router.navigate(["/home"]);

    }else{

      //Crear objeto user

      this.comment = new Comment(1, 1, 1, '', '');

    }


  }

  onSubmit(form){

    this._userService.crearComment(this.comment).subscribe(

      response => {

        if (response.status == 'success') {

          this.status = response.status;

          //Vaciar el formulario

          this.comment = new Comment(1, 1, 1, '', '');

          form.reset();

          this._router.navigate(['/home']);



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
