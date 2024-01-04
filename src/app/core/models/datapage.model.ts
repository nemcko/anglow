import { Observable, Subscribable, take, lastValueFrom } from 'rxjs';
import { Signal } from '@angular/core';

export type FilterData = Record<string, unknown | string | number | Date>;
export interface IRequestData {
    // filter?: { [field: string]: any };
    filter: FilterData;
    pageOffset?: number;
    pageSize?: number;
}
export interface IResponseData<T> {
    items: Array<T>;
    total?: number;
}

export interface IPageState<T> extends IRequestData, IResponseData<T> {
    isLoading: boolean;
}

export declare function toSig<T>(source: Observable<T>): Signal<T>;