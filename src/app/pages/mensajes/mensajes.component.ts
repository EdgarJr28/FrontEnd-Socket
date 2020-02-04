import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  nombreUsuario;

  constructor(public wsService: WebsocketService) { 
    this.nombreUsuario = localStorage.getItem('usuario')
    console.log(this.nombreUsuario)
  }

  ngOnInit() {
  }

  salir(){
    this.wsService.logOutWS();
  }
}
