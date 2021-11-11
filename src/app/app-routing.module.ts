import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { LoginCompradorComponent } from './loginComprador';
import { LoginMenuComponent } from './loginMenu';
import { PedidosMenuComponent } from './pedidosMenu';
import { RegistroMenuComponent } from './registroMenu';
import { ProductosMenuComponent } from './productosMenu';
import { FrutasMenuComponent } from './frutasMenu';
import { VentaManzanasComponent } from './ventaManzanas';
import { InicioComponent } from './inicio';
import { RegistroComponent } from './registro';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'loginComprador', component: LoginCompradorComponent },
  { path: 'loginMenu', component: LoginMenuComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productosMenu', component: ProductosMenuComponent },
  { path: 'frutasMenu', component: FrutasMenuComponent },
  { path: 'ventaManzanas', component: VentaManzanasComponent },
  { path: 'registroMenu', component: RegistroMenuComponent },
  { path: 'pedidosMenu', component: PedidosMenuComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
