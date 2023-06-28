import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ingredient, IngredientClientService } from '@client/ingredients';
import { ProductCategoryClientService } from '@client/product-category';
import {
  ProductCategory,
  ProductClientService,
  ProductCreatePayload,
} from '@client/products';

interface Form {
  name: string;
  value: number;
  hasStock: boolean;
  blocked: boolean;
  custom: boolean;
  imageUrl: string;
  categoryId: number;
  ingredientsIds: Array<number>;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading = false;
  categorys: Array<ProductCategory> = [];
  ingredients: Array<Ingredient> = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly ingredientClientService: IngredientClientService,
    private readonly productClientService: ProductClientService,
    private readonly productCategoryService: ProductCategoryClientService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0.01)]],
      hasStock: [false, Validators.required],
      blocked: [false, Validators.required],
      custom: [false, Validators.required],
      imageUrl: ['', [Validators.max(256), Validators.required]],
      categoryId: ['', [Validators.required, Validators.min(1)]],
      ingredientsIds: [[]],
    });
  }

  private clearForm(): void {
    this.formGroup.patchValue({
      name: '',
      value: '',
      hasStock: false,
      blocked: false,
      custom: false,
      imageUrl: '',
      categoryId: '',
      ingredientsIds: [],
    });
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    console.log(this.formGroup);
    if (this.formGroup.invalid) return;

    const {
      name,
      value,
      hasStock,
      blocked,
      custom,
      imageUrl,
      categoryId,
      ingredientsIds,
    } = this.formGroup.getRawValue() as Form;

    const payload: ProductCreatePayload = {
      name,
      value,
      hasStock,
      blocked,
      custom,
      imageUrl,
      categoryId,
      ingredientsIds,
    };

    this.createProduct(payload);
  }

  private createProduct(payload: ProductCreatePayload): void {
    this.isLoading = true;
    console.log(payload);
    this.productClientService.create(payload).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.clearForm();
      },
      error: (error: HttpErrorResponse) => alert(error.message),
      complete: () => (this.isLoading = false),
    });
  }

  ngOnInit(): void {
    this.ingredientClientService.getAll().subscribe({
      next: (response) => {
        this.ingredients = response.data;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
      complete: () => (this.isLoading = false),
    });

    this.productCategoryService.getAll().subscribe({
      next: (response) => {
        this.categorys = response.data;
      },
      error: (error: HttpErrorResponse) => console.log(error.message),
      complete: () => (this.isLoading = false),
    });
  }

  private navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  public navigateToIngredientsListPage() {
    this.navigateTo('products/list');
  }
}
