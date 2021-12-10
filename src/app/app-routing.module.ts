import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { LoginCompradorComponent } from './loginComprador';
import { LoginTransporteComponent } from './loginTransporte';
import { LoginMenuComponent } from './loginMenu';
import { PedidosMenuComponent } from './pedidosMenu';
import { PedidoVerduraComponent } from './pedidoVerdura';
import { PedidoMaizComponent } from './pedidoMaiz';
import { PedidoPaltaComponent } from './pedidoPalta';
import { PedidoFrutaComponent } from './pedidoFruta';
import { RegistroMenuComponent } from './registroMenu';
import { ProductosMenuComponent } from './productosMenu';
import { TransporteMenuComponent } from './transporteMenu';
import { TransportePedidoComponent } from './transportePedido';
import { FrutasMenuComponent } from './frutasMenu';
import { VentaManzanasComponent } from './ventaManzanas';
import { InicioComponent } from './inicio';
import { RegistroComponent } from './registro';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'loginComprador', component: LoginCompradorComponent },
  { path: 'loginTransporte', component: LoginTransporteComponent },
  { path: 'loginMenu', component: LoginMenuComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productosMenu', component: ProductosMenuComponent },
  { path: 'transporteMenu', component: TransporteMenuComponent },
  { path: 'transportePedido', component: TransportePedidoComponent },
  { path: 'frutasMenu', component: FrutasMenuComponent },
  { path: 'ventaManzanas', component: VentaManzanasComponent },
  { path: 'registroMenu', component: RegistroMenuComponent },
  { path: 'pedidosMenu', component: PedidosMenuComponent },
  { path: 'pedidoVerdura', component: PedidoVerduraComponent },
  { path: 'pedidoPalta', component: PedidoPaltaComponent},
  { path: 'pedidoMaiz', component: PedidoMaizComponent },
  { path: 'pedidoFruta', component: PedidoFrutaComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
