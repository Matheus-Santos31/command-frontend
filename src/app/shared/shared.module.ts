import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [NavComponent, LoaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  exports: [NavComponent, LoaderComponent],
})
export class SharedModule {}
