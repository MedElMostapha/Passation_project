import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToasterService {

  options: IndividualConfig;

  constructor(
    private toastr: ToastrService
  ) {
    this.options = this.toastr.toastrConfig;
    this.options.positionClass = 'toast-bottom-left';
    //this.options.timeOut = 1000;
  }

  showToast(title, message,timeOut, type) {
    this.toastr.show(message, title, this.options, 'toast-' + type);
  }
}
