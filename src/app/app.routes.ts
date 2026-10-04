import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { Login } from './login/login';
import { Weather } from './weather/weather';
import { authGuard, publicGuard } from './guard/auth-guard';

export const routes: Routes = [
  {path:'home',component:Home},
  {path:'register',component:Register,canActivate:[publicGuard]},
  {path:'login',component:Login,canActivate:[publicGuard]},
  {path:'weather',component:Weather,canActivate:[authGuard]},
  {path:'**',redirectTo:'/home'}
];
