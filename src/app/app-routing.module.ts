import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ingredients',
    loadChildren: () =>
      import('./modules/ingredients/ingredients.module').then(
        (m) => m.IngredientsModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
