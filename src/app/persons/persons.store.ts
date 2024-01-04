import { signal, effect, computed, untracked, Injectable } from '@angular/core';
import {
    lastValueFrom,
} from 'rxjs';
import { produce } from 'immer';
import { IPerson } from './persons.model';
import { PersonsService } from './persons.service';

const iniStateData = {
    filter: { search: signal('') },
    pageOffset: signal(0),
    pageSize: signal(10),
    items: signal<IPerson[]>([]),
    total: signal(0),
    isLoading: signal(false),
    selectedRow: signal<IPerson>(<IPerson>{}),
};

@Injectable({ providedIn: 'root' })
export class PersonsStore {
    constructor(
        private persons: PersonsService,
    ) { }
    private loadEffect = effect(() => {
        this.state.isLoading.set(true);
        lastValueFrom(this.persons.getResults({
            filter: { search: this.state.filter.search() },
            pageOffset: this.state.pageOffset(),
            pageSize: this.state.pageSize(),
        })).then((resp: any) => {
            this.state.selectedRow.set(<IPerson>{});
            this.state.items.set(resp.items);
            this.state.total.set(resp.total);
            this.state.isLoading.set(false);
            untracked(() => console.log('loadEffect'))
        });
    }, { allowSignalWrites: true });

    private selectEffect = effect(() => {
        const row = this.state.selectedRow();
        untracked(() => console.log('selectEffect:', row))
    });

    state = iniStateData

    rowDataChanged = computed(() => {
        const selrow = this.state.selectedRow()
        if (selrow.id == 0) return true;
        for (let i = 0; i < this.state.items().length; i++) {
            const aitem = this.state.items()[i]
            if (selrow.id && selrow.id === aitem.id) {
                return !(
                    selrow.name == aitem.name &&
                    selrow.gender == aitem.gender &&
                    selrow.company == aitem.company &&
                    selrow.age == aitem.age
                )
            }
        }
        return false
    });

    canUpdateRow = computed(() => this.state.selectedRow().id || this.state.selectedRow().id == 0);

    canDeleteRow = computed(() => this.state.selectedRow().id);

    refresh() {
        this.state.isLoading.set(true);
        lastValueFrom(this.persons.getResults({
            filter: { search: this.state.filter.search() },
            pageOffset: this.state.pageOffset(),
            pageSize: this.state.pageSize(),
        })).then((resp: any) => {
            this.state.selectedRow.set(<IPerson>{});
            this.state.items.set(resp.items);
            this.state.total.set(resp.total);
            this.state.isLoading.set(false);
        });
    }

    updateQuery(criteria: string) {
        this.state.pageOffset.set(1);
        this.state.filter.search.set(criteria);
    }

    updatePageSize(size: number) {
        this.state.pageSize.set(size);
    }

    updateField(name: string, val: string | number | Date) {
        this.state.selectedRow.set(produce(this.state.selectedRow(),
            (draftState: any) => {
                draftState[name] = val;
            }))
    }

    updatePageOffset(ofs: number) {
        this.state.pageOffset.set(ofs);
    }

    newRecord() {
        this.state.selectedRow.set(<IPerson>{});
        this.state.selectedRow.set(produce(this.state.selectedRow(),
            (draftState: any) => {
                draftState.id = 0;
                draftState.name = '';
                draftState.gender = 'Female';
                draftState.company = '';
                draftState.age = 1;
            }))
    }

    updateRecord() {
        let newitems = this.state.items()
        const rowid = this.state.selectedRow().id
        for (let i = 0; i < newitems.length; i++) {
            const aitem = newitems[i]
            if (rowid === aitem.id) {
                newitems[i] = this.state.selectedRow()
            }
        }
        this.state.items.update(values => [...newitems]);
    }

    saveRecord() {
        return this.persons.updatePerson(this.state.selectedRow())
    }

    deleteRecord() {
        return this.persons.deletePerson(Number(this.state.selectedRow().id))
    }

    selectRow(row: IPerson) {
        if (this.state.selectedRow().id !== row.id) {
            this.state.selectedRow.set(JSON.parse(JSON.stringify(row)));
        } else {
            this.state.selectedRow.set(<IPerson>{});
        }
    }

    deselectRow() {
        this.state.selectedRow.set(<IPerson>{});
    }

}

