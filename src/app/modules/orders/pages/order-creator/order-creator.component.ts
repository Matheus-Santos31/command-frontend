import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '@client/orders';
import { CreateOrderPayload, ProductsOrder } from '@client/orders/constant';
import {
  ProductByCategory,
  ProductCategory,
  ProductClientService,
} from '@client/products';
import { BaseRequestResult } from '@shared/models/base-request-result';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
export interface ProductCheck {
  id: number;
  name: string;
  value: number;
  quantity: number;
}
export interface ProductByCategoryCheck {
  productCategory: ProductCategory;
  products: Array<ProductCheck>;
}

@Component({
  selector: 'app-order-creator',
  templateUrl: './order-creator.component.html',
  styleUrls: ['./order-creator.component.css'],
})
export class OrderCreatorComponent implements OnInit {
  listProductsByCategory: Array<ProductByCategoryCheck> = [];
  public prodsTotalQuantity: number = 0;
  constructor(
    private productService: ProductClientService,
    private spinnerService: NgxSpinnerService,
    private orderService: OrderService,
    private router: Router
  ) {}

  getProducts() {
    this.spinnerService.show();
    this.productService
      .getAllGroupedByCategory()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (res: BaseRequestResult<ProductByCategory[]>) => {
          console.log(res.data);
          this.listProductsByCategory = res.data.map(
            (prod) =>
              ({
                productCategory: prod.productCategory,
                products: prod.products.map(
                  (prodC) =>
                    ({
                      id: prodC.id,
                      name: prodC.name,
                      value: prodC.value,
                      quantity: 0,
                    } as ProductCheck)
                ),
              } as ProductByCategoryCheck)
          );
          console.log(this.listProductsByCategory);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          this.spinnerService.hide();
        },
      });
  }

  handleQuantity(
    type: 'decrement' | 'increment',
    categoryIndex: number,
    productIndex: number
  ) {
    let quantity =
      this.listProductsByCategory[categoryIndex].products[productIndex]
        .quantity;

    if (type == 'decrement') {
      if (quantity == 0) return;
      quantity -= 1;
    } else quantity += 1;

    this.prodsTotalQuantity = quantity;

    this.listProductsByCategory[categoryIndex].products[productIndex].quantity =
      quantity;
  }

  createOrder() {
    this.spinnerService.show();
    const products: ProductCheck[] = [];
    this.listProductsByCategory.forEach((category) =>
      category.products.forEach((prods) => {
        if (prods.quantity > 0) {
          products.push(prods);
        }
      })
    );

    const clientId = Number(localStorage.getItem('clientId'));
    const newOrder: CreateOrderPayload = {
      clientId: clientId,
      productsList: products.map(
        (prod) =>
          ({ productId: prod.id, quantity: prod.quantity } as ProductsOrder)
      ),
    };

    console.log(newOrder);

    this.orderService
      .create(newOrder)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: () => {
          alert('Pedido criado com successo!');
          this.navigateTo('orders/client-identifier');
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          this.spinnerService.hide();
        },
      });
  }

  public navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
