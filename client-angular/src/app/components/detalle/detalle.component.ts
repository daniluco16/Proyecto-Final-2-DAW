import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { identity } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [UserService]
})
export class DetalleComponent implements OnInit {

  public title: string;

  public user: User;
  public identity;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {
    this.title = 'Detalle del usuario';  
    
    this.identity = this._userService.getIdentity();
    
   }

  ngOnInit() {

    if(identity == null){

      this._router.navigate(['/login']);


    }

    this.getUser();

  }

  getUser(){

    this._route.params.subscribe(

      params => {

        let id = +params['id'];

        this._userService.getUser(id).subscribe(

          response => {

            if(response.status == 'success'){

              this.user = response.user;

            }else{

              this._router.navigate(['home']);

            }

          },
          error => {

            console.log(<any>error);
          }

        );

      }

      
    );

  }

}
