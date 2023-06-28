import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  CreateIngredientPayload,
  IngredientClientService,
} from '@client/ingredients';

interface Form {
  description: string;
  price: number;
  units: number;
  hasStock: boolean;
}

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css'],
})
export class IngredientFormComponent implements OnInit {
  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly ingredientClientService: IngredientClientService
  ) {
    this.formGroup = this.formBuilder.group({
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      hasStock: [false, Validators.required],
      units: [
        { value: '', disabled: true },
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  private initHasStockObservable(): void {
    this.formGroup.get('hasStock')?.valueChanges.subscribe((value: boolean) => {
      if (value) {
        this.formGroup.get('units')?.enable();
      } else {
        this.formGroup.get('units')?.setValue('');
        this.formGroup.get('units')?.disable();
      }
    });
  }

  private navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  public navigateToIngredientsListPage() {
    this.navigateTo('ingredients/list');
  }
  private clearForm(): void {
    this.formGroup.patchValue({
      description: '',
      price: '',
      hasStock: false,
      units: '',
    });

    this.formGroup.get('units')?.disable();
  }

  private createIngredient(payload: CreateIngredientPayload): void {
    this.isLoading = true;
    this.ingredientClientService.create(payload).subscribe({
      next: () => {
        alert('Ingrediente criado com sucesso!');
        this.clearForm();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message), (this.isLoading = false);
      },
    });
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.formGroup.invalid) return;

    const { description, hasStock, price, units } =
      this.formGroup.getRawValue() as Form;

    const payload: CreateIngredientPayload = {
      description,
      hasStock,
      price,
      units,
    };

    this.createIngredient(payload);
  }

  ngOnInit(): void {
    this.initHasStockObservable();
  }
}
