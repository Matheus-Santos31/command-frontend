import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ClientsClientService,
  GetClientByDocumentPayload,
} from '@client/clients';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

export interface ClientFounderForm {
  document: string;
}

export interface Client {
  id: number;
  name: string;
  document: string;
  hasTicket: boolean;
}

@Component({
  selector: 'app-client-finder',
  templateUrl: './client-finder.component.html',
  styleUrls: ['./client-finder.component.css'],
})
export class ClientFinderComponent implements OnInit {
  clientFormGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isClient: boolean },
    private dialogRef: MatDialogRef<ClientFinderComponent>,
    private formBuilder: FormBuilder,
    private clientService: ClientsClientService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {
    this.clientFormGroup = this.formBuilder.group({
      document: ['', Validators.required],
    });
  }

  private findClient(payload: GetClientByDocumentPayload): void {
    this.spinnerService.show();
    this.clientService
      .getByDocument(payload)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          alert('Cliente encontrado com successo!');

          localStorage.setItem('clientId', res.data.id.toString());
          localStorage.setItem('clientName', res.data.name);
          localStorage.setItem('clientDocument', res.data.document);
          localStorage.setItem(
            'clientHasTicket',
            res.data.hasTicket ? 'true' : 'false'
          );
          this.clearForm();
          this.closeDialog();
          this.navigateTo('orders/order-creator');
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          this.spinnerService.hide();
        },
      });
  }

  private clearForm() {
    this.clientFormGroup.patchValue({
      document: '',
    });
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.clientFormGroup.invalid) return;

    const { document } =
      this.clientFormGroup.getRawValue() as ClientFounderForm;

    const payload: GetClientByDocumentPayload = {
      document,
    };

    this.findClient(payload);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
