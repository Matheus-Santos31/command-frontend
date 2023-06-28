import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientClientService } from '@client/ingredients';
import { Ingredient } from 'src/app/client/ingredients/constants';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css'],
})
export class IngredientsListComponent implements OnInit {
  ingredients: Array<Ingredient> = [];
  displayedColumns = ['description', 'price', 'units', 'hasStock'];
  constructor(
    private readonly ingredientService: IngredientClientService,
    private readonly router: Router
  ) {}

  private getIngredients(): void {
    this.ingredientService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.ingredients = [...res.data];
      },
      error: ({ message }: Error) => console.log(message),
    });
  }

  private navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  public navigateToIngredientCreation() {
    this.navigateTo('ingredients/create');
  }
  ngOnInit(): void {
    this.getIngredients();
  }
}
