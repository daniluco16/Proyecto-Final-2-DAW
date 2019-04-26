import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componenetes

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [

    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'registro', component: RegisterComponent},
    {path: '**', component: LoginComponent}


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);