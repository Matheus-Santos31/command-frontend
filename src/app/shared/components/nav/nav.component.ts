import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private router: Router) {}

  public navigateToCreateProduct() {
    this.navigateTo('products/create');
  }

  public navigateToListProduct() {
    this.navigateTo('products/list');
  }

  public navigateToListIngredients() {
    this.navigateTo('ingredients/list');
  }

  public navigateToCreateIngredients() {
    this.navigateTo('ingredients/create');
  }

  public navigateTo(path: string) {
    this.router.navigate([path]);
  }

  public navigateToOrderCreateFluxe() {
    this.navigateTo('orders/client-identifier');
  }

  ngOnInit(): void {}
}
