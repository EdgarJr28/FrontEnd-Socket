import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public sokectStatus = false;
  public usuario : Usuario
  constructor( 
    private sokect : Socket,
    
    ) {
    this.checkStatus();
   }

  checkStatus(){
    this.sokect.on('connect',()=>{
      console.log(`conectado al servidor`)
      this.sokectStatus = true;
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

    this.sokect.emit('configurar-usuario',{ nombre},(resp) =>{
      console.log(resp)
    })
  }
}
