import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_API_AUTENTICACAO } from '../Api/api.api';
import { Login } from '../model/login.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    private url_api = URL_API_AUTENTICACAO;
    public isAutenticado: boolean;
    public id: string;
    public token_id: string

    constructor(
        private http: Http, 
        private router: Router){
    }
    public login(logindata: Login): Observable<any>{
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(
            this.url_api,
            JSON.stringify(logindata),
            new RequestOptions({headers: headers})
            ).map((resposta: any) => {
                this.token_id = resposta.json().accessToken
                this.id = resposta.json().id
                this.router.navigate(['/dashboard'])
                console.log("ok")
                localStorage.setItem('id', this.id)
                localStorage.setItem('isAutenticado', this.token_id)
                
            })
    }

    public autenticado(): boolean{
        if(localStorage.getItem('isAutenticado') == null){
            return false;
        }
        if(localStorage.getItem('isAutenticado') != null){
            return true;
        }
    }
    public sair(): void{
        localStorage.removeItem('isAutenticado')
        this.router.navigate(['/'])
    }
}
