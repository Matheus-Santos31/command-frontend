import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientCreatorComponent } from '@modules/orders/components/client-creator/client-creator.component';
import { ClientFinderComponent } from '@modules/orders/components/client-finder/client-finder.component';

@Component({
  selector: 'app-client-identifier',
  templateUrl: './client-identifier.component.html',
  styleUrls: ['./client-identifier.component.css'],
})
export class ClientIdentifierComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  openDialog(isClient: boolean) {
    if (isClient)
      this.dialog.open(ClientFinderComponent, {
        height: '50vh',
        width: '50vw',
      });
    else
      this.dialog.open(ClientCreatorComponent, {
        height: '50vh',
        width: '50vw',
      });
  }

  ngOnInit(): void {}
}
