import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListadoComponent } from './components/listado/listado.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EditarComponent } from './components/editar/editar.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { DetallePeliculaComponent } from './components/detalle-pelicula/detalle-pelicula.component';
import { CommentPeliculasComponent } from './components/comment-peliculas/comment-peliculas.component';
import { PeliculaFavComponent } from './components/pelicula-fav/pelicula-fav.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ListadoComponent,
    DetalleComponent,
    EditarComponent,
    CrearUserComponent,
    DetallePeliculaComponent,
    CommentPeliculasComponent,
    PeliculaFavComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
