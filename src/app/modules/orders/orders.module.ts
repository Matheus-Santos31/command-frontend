import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientCreatorComponent } from './components/client-creator/client-creator.component';
import { ClientFinderComponent } from './components/client-finder/client-finder.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { ClientIdentifierComponent } from './pages/client-identifier/client-identifier.component';
import { OrderCreatorComponent } from './pages/order-creator/order-creator.component';

@NgModule({
  declarations: [
    ClientIdentifierComponent,
    ClientCreatorComponent,
    ClientFinderComponent,
    OrderCreatorComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
  ],
})
export class OrdersModule {}
