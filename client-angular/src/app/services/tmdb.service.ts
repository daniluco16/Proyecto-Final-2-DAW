import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()

export class tmdbService{

    private apiUrl: string;

    public identity;
    public token;

    constructor(

        public _http: HttpClient

    ){

        this.apiUrl = GLOBAL.apiurl;

    }

    searchMovies(year): Observable<any>{

        let headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(`${this.apiUrl}discover/movie?api_key=${GLOBAL.apikey}&sort_by=popularity.desc&page=1&primary_release_date=${year}&year=${year}`,{headers});

    }

    findMovies(query): Observable<any>{

        let headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(`${this.apiUrl}search/movie?api_key=${GLOBAL.apikey}&query=${query}`,{headers});

    }

    getDetalleMovie(id): Observable<any>{


        let headers =  new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(`${this.apiUrl}movie/${id}?api_key=${GLOBAL.apikey}&append_to_response=videos`, {headers});


    }



}