import { Component, OnInit } from '@angular/core';
import { ModeloUsuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usario: ModeloUsuario;
  recordarme = false;

  constructor( private auth: AuthService, private route: Router ) { }

  ngOnInit() {
    this.usario = new ModeloUsuario();
    if (localStorage.getItem('email')){
      this.usario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  nuevoUsuario(value: NgForm) {
    if (value.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      position: 'center',
      icon: 'info',
      title: 'Espere por favor',
      timer: 1500
    });
    this.auth.usuarioNuevo(this.usario).subscribe((Data) => {
      if (this.recordarme) {
        localStorage.setItem('email', this.usario.email );
      }
      this.route.navigateByUrl('/Login');
      Swal.close();
    }, ((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear nuevo usuario',
        text: err.error.error.message
      });
    }));
  }
}
