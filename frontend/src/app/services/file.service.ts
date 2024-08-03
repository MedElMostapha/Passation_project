import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import { SERVER_URL_BE2,SERVER_URL_BE3, SERVER_URL_BE, SERVER_URL_FE,SERVER_URL_BEPing } from '../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient, ) { }
  private baseUrl = 'http://localhost:8089/api/rest/uploadFiles';
  // upload(file: File, id:any): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //
  //   formData.append('file', file);
  //   formData.append('idPaa', id);
  //
  //   const req = new HttpRequest('POST', SERVER_URL_BE+'uploadFiles/upload', formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //
  //   return this.http.request(req);
  // }
  upload(file: File,idElm:any,fkIdTbl:any,fkIduser:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('idElm', idElm);
    formData.append('fkIduser', fkIduser);
    formData.append('fkIdTbl', fkIdTbl);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getDirPaa(id,idTbl): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'uploadFiles/listDocsPaa',{ params:{'idElm':id,'fkIdTbl':idTbl}});
  }
}
