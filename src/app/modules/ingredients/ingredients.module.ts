import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientFormComponent } from './pages/ingredient-form/ingredient-form.component';
import { IngredientsListComponent } from './pages/ingredients-list/ingredients-list.component';

@NgModule({
  declarations: [IngredientsListComponent, IngredientFormComponent],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTableModule,
  ],
})
export class IngredientsModule {}
