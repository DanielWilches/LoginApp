import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: 'Home', component: HomeComponent , canActivate: [ AuthGuard ]},
  { path: 'Login', component: LoginComponent  },
  { path: 'Registro', component: RegistroComponent },
  {path: '**' , redirectTo: 'Registro'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
