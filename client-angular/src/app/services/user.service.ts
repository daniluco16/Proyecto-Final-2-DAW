import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable()

export class UserService {

    public url: string;

    public identity;
    public token;

    constructor(

        public _http: HttpClient

    ){

        this.url = GLOBAL.url;

    }
    pruebas(){

        return "Hola Mundo";

    }
    register(user): Observable<any>{

        let json = JSON.stringify(user);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register', params, {headers:headers});


    }
    store(user): Observable<any>{

        let json = JSON.stringify(user);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+ 'store', params, {headers:headers});

    }
    
    signup(user, geTtoken = null): Observable<any>{

        if(geTtoken != null){

            user.getToken = 'true';

        }

        let json = JSON.stringify(user);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', params, {headers:headers});


    }

    getUsers(): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'listado', {headers: headers})
        
    }

    getUser(id): Observable<any>{

        return this._http.get(this.url+'detalle/'+ id);

    }
    changeRol(token, id): Observable<any>{

        let json = JSON.stringify(id);

        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.put(this.url + 'changeRol/' + id, params, {headers: headers});


    }
    updateUser(token, user, id): Observable<any>{

        let json = JSON.stringify(user);

        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.put(this.url + 'update/' + id, params, {headers: headers});

    }

 


    delete(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);


        return this._http.delete(this.url+'destroy/'+ id, {headers: headers});


    }


    getIdentity(){

        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){

            this.identity = identity;

        }else{

            this.identity = null;

        }

        return this.identity;

    }
    getToken(){

        let token = localStorage.getItem('token');

        if(token != "undefined"){

            this.token = token;

        }else{

            this.token = null;

        }

        return this.token;

    }

    //Comentarios

    crearComment(token, comment): Observable<any>{

        let json = JSON.stringify(comment);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.post(this.url+'crearComment', params, {headers});

    }

    listarComment(id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'listadoComment/'+id, {headers})

    }

    deleteComment(token, id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);

        return this._http.delete(this.url+'deleteComment/'+ id, {headers});

    }

    //Favoritos

    crearFavorite(data): Observable<any>{

        let json = JSON.stringify(data);

        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());

        return this._http.post(this.url+'addFavorito', params, {headers});

    }

    listarFavoritos(id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'listadoFavorito/'+id, {headers})

    }

    deleteFavorito(id): Observable<any>{

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());

        return this._http.delete(this.url+'deleteFavorito/'+id, {headers});

    }


}