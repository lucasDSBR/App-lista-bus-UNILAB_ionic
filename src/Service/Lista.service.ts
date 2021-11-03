import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_LISTA } from '../Api/api.api';
import 'rxjs/add/operator/map';
import { Lista } from '../Model/Lista.model'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ListaService {

    private url_api = URL_API_LISTA;
    public isAutenticado: boolean;
    constructor(private http: Http, private router: Router){
        
    }
    public getLista(): Promise<Lista[]>{
        return this.http.get(this.url_api)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }


    public getListaId(Id: any): Promise<Lista[]>{
        return this.http.get(this.url_api+`/${Id}`)
        .toPromise()
        .then((resposta: any) => resposta.json())
    }

    public entrarNaLista(updateData, Id): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.patch(
            this.url_api+`/${Id}`,
            JSON.stringify(updateData),
            new RequestOptions({headers: headers}))
            .map((resposta: any) => {
                console.log("Resposta:"+resposta.json())
            })
    }

    public createList(dataLista: any, token): Observable<any>{
        console.log(token)
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
        return this.http.post(
            this.url_api,
            JSON.stringify(dataLista),
            new RequestOptions({headers: headers})
            ).map((resposta: any) => resposta.json())
    }
}