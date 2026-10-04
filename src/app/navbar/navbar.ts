import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  isMenuOpen =signal(false);
  constructor(public authservice:AuthService){}

  toggleMenu(){
    this.isMenuOpen.update(value=>!value)
  }

  logout(){
    this.authservice.logout()
  }
}
