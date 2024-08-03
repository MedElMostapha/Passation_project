import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_URL_BE} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlisService {

  constructor(private http: HttpClient, ) { }

  createPlis(data:any): Observable<any> {
    return this.http.post(SERVER_URL_BE+ 'Plis/createPlis',data);
  }

  getListPlisByDir(id:any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Plis/getPlisByIdDossier/'+id);
  }
}
