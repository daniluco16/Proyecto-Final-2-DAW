import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  public title: string;


  constructor(

    

  ) {
    this.title = 'Detalle de las películas';  


   }

  ngOnInit() {

    console.log("detallePelicula.component cargado correctamente");

  }

}
