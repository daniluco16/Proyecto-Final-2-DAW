import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { identity } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [UserService]
})
export class ListadoComponent implements OnInit {

  public p: number = 1;

  public title: string;
  public users: Array<User>;
  public token;
  public identity;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {
    this.title = 'Listado de usuarios';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

   }

  ngOnInit() {

    console.log('listado.component cargado correctamente');

    this.getUsers();
    

  }

  getUsers(){

    this._userService.getUsers().subscribe(

      response => {

        if(response.status == 'success'){

          this.users = response.user;

        }
        console.log(response);

      },
      error => {

        console.log(error);
      }


    );


  }

  deleteUser(id){
    this._userService.delete(this.token, id).subscribe(

      response => {

        this.getUsers();

      },
      error => {

        console.log(<any>error);

      }


    );

  }

}
