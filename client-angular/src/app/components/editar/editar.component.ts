import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [UserService]
})
export class EditarComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public token;
  public url: any;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

    

  ) {

    this.title = 'Editar usuario';

    this.token = this._userService.getToken();


    this.user = new User(1, '', '', '', '', '', '', '');


   }

  ngOnInit() {

    console.log('editar.component cargado correctamente');

    this._route.params.subscribe(

      params => {

        let id = +params['id'];

        this.getUser(id);

  });

  }

  readUrl(event:any) 
  {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event: ProgressEvent) => {
           this.url = (<FileReader>event.target).result;
           this.user.image = this.url;
        }

        reader.readAsDataURL(event.target.files[0]);
         (event.target.files[0]);
      }
  }


  getUser(id){

        this._userService.getUser(id).subscribe(

          response => {

            if(response.status == 'success'){

              this.user = response.user;
              console.log(response);

            }else{

              this._router.navigate(['home']);

            }
          },
          error => {

            console.log(<any>error);

            this.status = 'error';
          }
        );
  }

  onSubmit(form) {

   console.log(this.user.id);

   this._userService.updateUser(this.token, this.user, this.user.id).subscribe(

    response => {

      console.log(response);

      if(response.status == 'success'){

        this.status = 'success';
        this.user = response.user;

        this._router.navigate(['listadoUser']);


      }else{
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
