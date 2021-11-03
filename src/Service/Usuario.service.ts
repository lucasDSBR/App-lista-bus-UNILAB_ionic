import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_USUARIO } from '../Api/api.api';
import { User } from '../model/User.model';
import { DetailUser } from '../model/DetailUser.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

    private url_api = URL_API_USUARIO;
    public isAutenticado: boolean;
    constructor(private http: Http, private router: Router){
        
    }
    public cadatroUsuario(formData: User): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(
            this.url_api,
            JSON.stringify(formData),
            new RequestOptions({headers: headers})
            ).map((resposta: any) => {
                this.isAutenticado = resposta.json()
            })
    }

    public getUsuarios(token: any): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        return this.http.get(
            this.url_api,
            new RequestOptions({headers: headers})
            ).map((resposta: any) => resposta.json())
    }

    public getUsuarioId(Id: any, token: any): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        return this.http.get(
            this.url_api+`/${Id}`,
            new RequestOptions({headers: headers})
            ).map((resposta: any) => resposta.json())
    }

    public delUsuarioId(Id: any, token: any): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        return this.http.delete(
            this.url_api+`/${Id}`,
            new RequestOptions({headers: headers})
            ).map((resposta: any) => resposta.json())
    }
}
