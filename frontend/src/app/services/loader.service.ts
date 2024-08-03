import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private spinner: NgxSpinnerService) {

  }
}
