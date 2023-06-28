import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductsListComponent,
  },
  {
    path: 'create',
    component: ProductFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
