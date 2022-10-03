import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _refresh$=new Subject<void>();
  constructor(private httpclient: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getAll(): Observable<any> {
    return this.httpclient.get(`${environment.apiUrl}/person`);
  }

  create(person: any): Observable<any> {
    return this.httpclient.post(`${environment.apiUrl}/person`, person);
  }

  update(person: any): Observable<any> {
    return this.httpclient.put(`${environment.apiUrl}/person`, person);
  }

  delete(idPerson: any): Observable<any> {
    return this.httpclient.delete(`${environment.apiUrl}/person/${idPerson}`,);
      /*.pipe(
        tap(()=> {
          this._refresh$.next();
        })
      )*/
  }

  getTypeDocument(): Observable<any> {
    return this.httpclient.get(`${environment.apiUrl}/documentType`);
  }
}
