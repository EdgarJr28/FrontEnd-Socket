import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario'
import { RouterModule, Routes, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public sokectStatus = false;
  public usuario : Usuario 
  constructor( 
    private sokect : Socket,
    private router : Router
    
    ) {
    this.cargarStorage();
    this.checkStatus();
   }

  checkStatus(){
    this.sokect.on('connect',()=>{
      console.log(`conectado al servidor`)
      this.sokectStatus = true;
      this.cargarStorage();
    })


    this.sokect.on('disconnect',()=>{
      console.log(`desconectado del servidor`)
      this.sokectStatus = false;
    })
  }

  emit( evento : string, payload?: any, callback?: Function){
      this.sokect.emit(evento, payload, callback)
  }

  listen(evento : string){
   return this.sokect.fromEvent( evento );
  }

  loginWS(nombre:string){
    return new Promise((resolve,reject)=>{
      this.sokect.emit('configurar-usuario',{ nombre },(resp) =>{
      
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve();
        console.log( this.usuario, " ← Usuario")
      });
    })
  }

  logOutWS(){
    this.usuario = null;
    localStorage.removeItem('usuario');
    const payload = {
      nombre: 'sin-nombre'
    }
    this.sokect.emit('configurar-usuario', payload, () =>{}) ;
    this.router.navigateByUrl('');
  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage(){
        localStorage.setItem('usuario',JSON.stringify(this.usuario));
    }

  cargarStorage(){
    if(localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.loginWS(this.usuario.nombre);
    }
  

  }
}
