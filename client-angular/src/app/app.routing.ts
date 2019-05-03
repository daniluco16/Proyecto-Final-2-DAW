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



const appRoutes: Routes = [

    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'logout/:sure', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'registro', component: RegisterComponent},
    {path:'listadoUser', component: ListadoComponent},
    {path:'listadoUser/detalle/:id', component: DetalleComponent},
    {path:'listadoUser/editar/:id', component: EditarComponent},
    {path:'listadoUser/crear', component: CrearUserComponent},    
    {path:'**', component: LoginComponent}


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);