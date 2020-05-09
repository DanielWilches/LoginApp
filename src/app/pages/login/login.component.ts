import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginModel } from 'src/app/models/login.modelo';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: LoginModel = new LoginModel();
  recordarme = false;

  constructor(public router: Router, private Auth: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.login.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  envioLogin(from: NgForm) {
    if (from.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      position: 'center',
      icon: 'info',
      title: 'Espere por favor',
      timer: 1500
    });
    Swal.showLoading();
    this.Auth.login(this.login).subscribe((data) => {
      if (this.recordarme) {
        localStorage.setItem('email', this.login.email);
      }
      Swal.close();
      this.router.navigate(['/Home']);
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
    });
  }

}
