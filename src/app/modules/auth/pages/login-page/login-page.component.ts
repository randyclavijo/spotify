import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  errorSession: boolean = false;

  constructor(
    private authService: AuthService,
    private cookie: CookieService
  ){}
  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email,

      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    })
  }



   sendLogin(): void{
    const {email, password} = this.formLogin.value;
    this.authService.sendCredentials(email, password)
    .subscribe(responseOk =>{
        console.log('Session inicia correcta', responseOk);
        //TODO: llega tokenSesion y data por consola 
        const {tokenSession, data} = responseOk
        //Se guarda cookie se obtiene de tokenSession dura 4 dias y es valido para todas las rutas
        this.cookie.set('token', tokenSession, 4, '/')
    }, err =>{
      console.log('Ocurrio error con tu email o password')
      this.errorSession = true;

    })

   }






}
