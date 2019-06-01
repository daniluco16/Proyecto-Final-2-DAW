import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public title: string;

  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService


  ) {
    this.title = 'Registro';
    this.user = new User(1, '', '', '', '', '', '', 'Usuario');
  }


  ngOnInit() {

    if(this._userService.getIdentity()){

      this._router.navigate(['home']);

    }

    console.log('register.component cargado correctamente');

  }

  onSubmit(form){

    // console.log(this.user);

    // console.log(this._userService.pruebas());

    this._userService.register(this.user).subscribe(
      
      response => {

        if(response.status == 'success'){

          this.status = response.status;

          //Vaciar el formulario

          this.user = new User(1, '', '', '', '', '', '', 'Usuario');

          form.reset();


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