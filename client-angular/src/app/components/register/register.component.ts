import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public title: string;

    constructor(

    ){
        this.title = 'Registro';

    }

    ngOnInit(){

        console.log('register.component cargado correctamente');

    }
}