import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componenetes

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ListadoComponent } from './components/listado/listado.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { EditarComponent } from './components/editar/editar.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { DetallePeliculaComponent } from './components/detalle-pelicula/detalle-pelicula.component';
import { CommentPeliculasComponent } from './components/comment-peliculas/comment-peliculas.component';
import { PeliculaFavComponent } from './components/pelicula-fav/pelicula-fav.component';



const appRoutes: Routes = [

    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'logout/:sure', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'home/detallePelicula', component: DetallePeliculaComponent},
    {path:'home/comments', component: CommentPeliculasComponent},
    {path:'registro', component: RegisterComponent},
    {path:'crearComment', component: CommentPeliculasComponent},
    {path:'listadoUser', component: ListadoComponent},
    {path:'listadoUser/detalle/:id', component: DetalleComponent},
    {path:'listadoUser/editar/:id', component: EditarComponent},
    {path:'listadoUser/crear', component: CrearUserComponent},    
    {path:'listadoFav', component: PeliculaFavComponent},    
    {path:'**', component: LoginComponent}


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);