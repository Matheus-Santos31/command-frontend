import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientsClientService, CreateClientPayload } from '@client/clients';
import { NgxSpinnerService } from 'ngx-spinner';

export interface ClientCreatorForm {
  name: string;
  document: string;
}

@Component({
  selector: 'app-client-creator',
  templateUrl: './client-creator.component.html',
  styleUrls: ['./client-creator.component.css'],
})
export class ClientCreatorComponent implements OnInit {
  clientFormGroup!: FormGroup;
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { isClient: boolean },
    private dialogRef: MatDialogRef<ClientCreatorComponent>,
    private formBuilder: FormBuilder,
    private clientService: ClientsClientService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {
    this.clientFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required],
    });
  }

  private createClient(payload: CreateClientPayload): void {
    this.spinnerService.show();
    this.clientService.create(payload).subscribe({
      next: (res) => {
        alert('Cliente criado com successo!');
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
      name: '',
      document: '',
    });
  }

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.clientFormGroup.invalid) return;

    const { name, document } =
      this.clientFormGroup.getRawValue() as ClientCreatorForm;

    const payload: CreateClientPayload = {
      name,
      document,
    };

    this.createClient(payload);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {}
}
