import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title: string;

    constructor(

    ){
        this.title = 'Home';

    }

    ngOnInit(){

        console.log('app.component cargado correctamente');

    }
}
