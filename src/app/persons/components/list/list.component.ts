import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgIf, NgForOf, MaterialModule } from '../../../shared/index';
import { PersonsStore } from '../../persons.store';
import { DetailComponent } from '../detail/detail.component';
import { IPerson } from '../../persons.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    FormsModule, MatPaginatorModule, MatTableModule, MaterialModule, FlexLayoutModule,
    NgIf, NgForOf,
    DetailComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly persons = inject(PersonsStore);
  readonly columnsToDisplay = ['name', 'gender', 'company', 'age']

  getPaginatorData(event: PageEvent): PageEvent {
    this.persons.updatePageOffset(event.pageIndex)
    this.persons.updatePageSize(event.pageSize)
    return event;
  }

  selectRow(row: IPerson) {
    this.persons.selectRow(row)
  }
}
