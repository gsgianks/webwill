import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './ui/login/login/login.component';
import { LogoutComponent } from './ui/login/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './ui/home/home.module#HomeModule'
  },
  {
    path: 'user',
    loadChildren: './ui/user/user.module#UserModule'
  },
  {
    path: 'motorcycle',
    loadChildren: './ui/motorcycle/motorcycle.module#MotorcycleModule'
  },
  {
    path: 'receivingsheet',
    loadChildren: './ui/receivingsheet/receivingsheet.module#ReceivingSheetModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
