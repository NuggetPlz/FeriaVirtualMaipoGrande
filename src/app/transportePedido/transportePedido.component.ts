import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({ 
    selector: 'app-interfaz',
    templateUrl: 'transportePedido.component.html' })

export class TransportePedidoComponent {

    constructor(public servicio: ServicioService) { }

    ngOnInit(){
        
    }
}