import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductFormComponent } from './pages/product-form/product-form.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ProductFormComponent, ProductsListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
