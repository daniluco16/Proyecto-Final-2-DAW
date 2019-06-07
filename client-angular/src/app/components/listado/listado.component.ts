import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { identity } from 'rxjs';
import { $ } from 'protractor';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [UserService]
})
export class ListadoComponent implements OnInit {

  public p: number = 1;
  public search: string;
  public title: string;
  public user: User;
  public status: string;
  public users: Array<User>;
  public token;
  public identity;

  

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    public dialog: MatDialog

  ) {
    this.title = 'Listado de usuarios';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

   }

  ngOnInit() {

    this.getUsers();
  
  }

  openDialog(idUser, nick): void {

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '600px',
      height: '260px',
      data: {idUser: idUser, nick: nick}
    });

    dialogRef.afterClosed().subscribe(result => {

      for (let index = 0; index < this.users.length; index++) {
        const user = this.users[index];

        if(user.id == result){

          this.users.splice(index, 1);

        }
        
      }

      console.log('The dialog was closed');
    });

  }

  getUsers(){

    this._userService.getUsers().subscribe(

      response => {


        if(response.status == 'success'){

          this.users = response.user;

        }

      },
      error => {

        console.log(error);
      }


    );


  }


  changeRol(id){

    this._userService.changeRol(this.token, id).subscribe(

      response => {

  
        if(response.status == 'success'){
  
          this.status = 'success';

          this.getUsers();

    
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
