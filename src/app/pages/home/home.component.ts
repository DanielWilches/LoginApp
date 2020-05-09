import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private AuthS: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }
  CerrarSesion() {
    this.AuthS.logout();
    this.router.navigateByUrl('/Login');
  }

}
