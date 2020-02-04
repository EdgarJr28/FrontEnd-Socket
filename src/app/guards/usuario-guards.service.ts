import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router'
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuards implements CanActivate{

  constructor(public wsService: WebsocketService, private router : Router) { }



  canActivate(){
    if(this.wsService.getUsuario()){
      return true;
    }else {
     /*  console.log('usuario no loggeado') */
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
