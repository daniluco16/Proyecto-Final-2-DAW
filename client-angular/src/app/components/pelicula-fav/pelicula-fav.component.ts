import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { identity } from 'rxjs';

@Component({
  selector: 'app-pelicula-fav',
  templateUrl: './pelicula-fav.component.html',
  styleUrls: ['./pelicula-fav.component.css'],
  providers: [UserService]
})
export class PeliculaFavComponent implements OnInit {

  public token;
  public identity;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();

   }

  ngOnInit() {

    if(identity == null){

      this._router.navigate(['/login']);


    }

  }

}
