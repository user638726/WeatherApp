import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router'

export interface User{
  email:string,
  password:string,
  name:string
}

@Injectable({
  providedIn:'root'
})
export class AuthService {
  private currentUSerSignal =signal<User | null>(null);
  currentUser = this.currentUSerSignal.asReadonly();

  constructor(private router:Router){
    const savedUser = localStorage.getItem('currentUser');
    if(savedUser){
      this.currentUSerSignal.set(JSON.parse(savedUser));
    }
  }

  getUsers():User[]{
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users):[];
  }

  register(user:User):boolean{
    const users = this.getUsers();
    if(users.find(u=>u.email === user.email)){
      return false;
    }

    users.push(user);
    localStorage.setItem('users',JSON.stringify(users));
    return true;
  }
  login(email:string,password:string):boolean{
    const users = this.getUsers();
    const user = users.find(u=>u.email === email && u.password === password );
    if(user){
      this.currentUSerSignal.set(user);
      localStorage.setItem('currentUser',JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout():void{
    this.currentUSerSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated():boolean{
    return this.currentUSerSignal()!=null;
  }

}
