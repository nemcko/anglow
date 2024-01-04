import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { PersonsStore } from '../../persons.store';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, SnackBarComponent],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  readonly persons = inject(PersonsStore);
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  deletePerson() {
    this.persons.deleteRecord()
      .then((msg) => {
        this.persons.refresh()
      })
      .catch((msg) => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 5000,
          data: msg.statusText
        });
      })
  }
}