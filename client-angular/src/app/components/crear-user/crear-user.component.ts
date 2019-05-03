import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css'],
  providers: [UserService]

})
export class CrearUserComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public url: any;
  public user: User;
  public status: string;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {

    this.title = 'Añadir Usuario';

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

  }

  ngOnInit() {

    console.log('crear-user.component cargado correctamente');

    if(this.identity == null){

      this._router.navigate(["/login"]);

    }else{

      //Crear objeto user

      this.user = new User(1, '', '', '', '', '', '', '');

    }


  }

  onSubmit(form) {

    this._userService.store(this.user).subscribe(

      response => {

        if (response.status == 'success') {

          this.status = response.status;

          //Vaciar el formulario

          this.user = new User(1, '', '', '', '', '', '', '');

          form.reset();

          this._router.navigate(['listadoUser']);



        } else {


          this.status = 'error';

        }

      },
      error => {

        console.log(<any>error);

      }

    );


  }

  readUrl(event:any){

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

}
