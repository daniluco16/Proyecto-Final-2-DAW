import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService


  ) {
    this.title = 'Home';
  }


  ngOnInit() {

    console.log('home.component cargado correctamente');

  }

  
}