import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientIdentifierComponent } from './pages/client-identifier/client-identifier.component';
import { OrderCreatorComponent } from './pages/order-creator/order-creator.component';

const routes: Routes = [
  {
    path: 'client-identifier',
    component: ClientIdentifierComponent,
  },
  {
    path: 'order-creator',
    component: OrderCreatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
