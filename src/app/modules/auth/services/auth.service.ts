import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly URL= environment.api
  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }

  sendCredentials(email:string, password: string):Observable<any>{
    // se coloca el body xq es el cuerpo que necesita la peticcion ahi esta email y password
    const body = {
      email,
      password,
    }
     return this.http.post(`${this.URL}/auth/login`, body)
     //TODO: aqui ejemplo de guardar cookie desde el servicio
     .pipe(
      tap((responseOk: any) =>{
        const {tokenSession, data} = responseOk        
        this.cookie.set('token_servicie', tokenSession, 4, '/')
        this.router.navigate(['/','tracks'])
      })
    )
   
  }
}
