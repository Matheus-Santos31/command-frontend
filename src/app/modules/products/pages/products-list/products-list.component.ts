import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductClientService } from '@client/products';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Array<Product> = [];
  displayedColumns = [
    'name',
    'value',
    'hasStock',
    'blocked',
    'custom',
    'category',
  ];
  constructor(
    private readonly productService: ProductClientService,
    private readonly router: Router
  ) {}

  private getProducts(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.products = [...res.data];
      },
      error: ({ message }: Error) => console.log(message),
    });
  }

  private navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  public navigateToProductCreationPage() {
    this.navigateTo('products/create');
  }
  ngOnInit(): void {
    this.getProducts();
  }
}
