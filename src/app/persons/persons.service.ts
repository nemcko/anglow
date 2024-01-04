import { inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CRC32 } from '../shared';
import { IRequestData, IResponseData } from '../core/models';
import { IPerson } from './persons.model';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private http = inject(HttpClient);
  private crc32 = inject(CRC32);

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    })
  };

  public getResults(req: IRequestData): Observable<any> {
    return this.http.post<IResponseData<IPerson>>(`${environment.REST_SRV}${environment.REST_LIST}`, JSON.stringify(req), this.httpOptions);
  }

  public updatePerson(person: IPerson): Promise<object> {
    if (person.id) {
      return lastValueFrom(this.http.put<IPerson>(`${environment.REST_SRV}${environment.REST_PERSON}/${person.id}`,
        JSON.stringify(person), this.httpOptions));
    } else {
      return lastValueFrom(this.http.post<IPerson>(`${environment.REST_SRV}${environment.REST_PERSON}`,
        JSON.stringify(person), this.httpOptions));
    }
  }

  deletePerson(id: number): Promise<object> {
    return lastValueFrom(this.http.delete(`${environment.REST_SRV}${environment.REST_PERSON}/${id}`));
  }
}