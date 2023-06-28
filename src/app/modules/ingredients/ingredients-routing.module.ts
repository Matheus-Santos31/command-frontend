import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IngredientFormComponent } from './pages/ingredient-form/ingredient-form.component';
import { IngredientsListComponent } from './pages/ingredients-list/ingredients-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: IngredientsListComponent,
  },
  {
    path: 'create',
    component: IngredientFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
