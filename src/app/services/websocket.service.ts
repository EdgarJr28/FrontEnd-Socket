import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public sokectStatus = false;

  constructor(
    private socket : Socket
  ) {
      this.socket.on('connect', ()=>{
        console.log('Conectando al servidor');
        this.sokectStatus = true;
      })
   }
}
