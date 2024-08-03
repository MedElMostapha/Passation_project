import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SERVER_URL_BE} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {
  constructor(private http: HttpClient, ) { }


  getAllDossier(): Observable<any> {
    let headers = this.getHeaders();
    return this.http.get("http://localhost:8081/api/rest/Dossier",{headers});
  }
  createDossier(data:any): Observable<any> {
    let headers = this.getHeaders();
    return this.http.post("http://localhost:8081/api/rest/Dossier",data,{headers});
  }
  getLetters(id:any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Dossier/getLettres/'+id);
  }
  getLettresByQuery(id:any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Dossier/LettresNotInPlis/'+id);
  }

  download(file: string | undefined,fileSubFolder:any): Observable<Blob> {
    return this.http.get(`${SERVER_URL_BE}uploadFiles/${file}`, {
      responseType: 'blob',
      params:{'fileSubFolder':fileSubFolder}
    });
  }
  createLetters(data: any): Observable<any> {
    let headers = this.getHeaders();

    return this.http.post('http://localhost:8081/api/rest/Dossier/createLettre',data,{headers});
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }



}

