import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-peliculas',
  templateUrl: './comment-peliculas.component.html',
  styleUrls: ['./comment-peliculas.component.css']
})
export class CommentPeliculasComponent implements OnInit {

  public title: string;


  constructor(

  ) {

    this.title = 'Detalle del usuario';  


   }

  ngOnInit() {

    console.log('commentPeliculas.component cargado correctamente');


  }

}
