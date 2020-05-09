import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.modelo';
import { ModeloUsuario } from '../models/usuario.model';


import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  apiKey = 'AIzaSyCw3rMtL40yQmjknaIPfwXrfUk-TdlhrX0';
  userToken: string;
  // creacionm de usuario
  // 'signUp?key=[API_KEY]';
  // login
  // signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
   }

  login(usuario: LoginModel) {
    const LOGINDATA = {
      email: usuario.email,
      password: usuario.password
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, LOGINDATA)
      .pipe(map((resp) => {
        console.log('entre en el mapa ');
        this.guardarToken(resp['idToken']);
        return resp;
      }));
  }

  usuarioNuevo(usuario: ModeloUsuario) {
    const AUTHDATA = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, AUTHDATA)
      .pipe(map((resp) => {
        console.log('entre en el mapa ');
        this.guardarToken(resp['idToken']);
        return resp;
      }));
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }


}
