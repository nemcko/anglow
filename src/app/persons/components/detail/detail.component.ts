import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { NgIf, MaterialModule } from '../../../shared/index';
import { PersonsStore } from '../../persons.store';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MaterialModule, FormsModule,
    NgIf,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    DeleteDialogComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  readonly persons = inject(PersonsStore);

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  protected showMessage(msg: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: msg
    });
  }

  deleteDialog() {
    this.dialog.open(DeleteDialogComponent, {
      width: '400px',
    });
  }

  saveRecord() {
    this.persons.saveRecord()
      .then((data) => {
        if (this.persons.state.selectedRow().id) {
          this.persons.updateRecord();
          this.persons.deselectRow();
        } else {
          this.persons.state.pageOffset.set(Math.floor(this.persons.state.total() / this.persons.state.pageSize()))
          this.persons.refresh()
        }
      })
      .catch((msg) => this.showMessage(msg.statusText))
  }
}
