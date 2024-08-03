import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {SaisieService} from "../../services/saisie.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertComponent} from "ngx-bootstrap/alert/alert.component";
import {
  GridComponent,
  RowDataBoundEventArgs,
  RowSelectEventArgs,
  SelectionSettingsModel,
  ToolbarItems,
  GroupSettingsModel,
  PageSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import {MyToasterService} from "../../services/my-toaster.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('sample') public listObj: DropDownListComponent;
  @ViewChild('overviewgrid') public gridInstance : GridComponent ;
  modalRef: BsModalRef;
  register: FormGroup;
  users={};
  selectedRoles=[];
  tabroles=[];
  alertsMatricule: any[] = [{}];
  errorMatricule=false;
  alerts: any[] = [{}];
  public toolbar: string[];
  public toolbarOptions: ToolbarItems[];
  public selectionOptions: SelectionSettingsModel;
  public groupOptions: GroupSettingsModel;
  //public groupOptions: Object;
  public initialPage: Object;
  selectedrecords={};
  tailleSelect = 0;
  btnValidation =false;
  public filter: Object;
  public filterSettings: Object;
  public selectionSettings: Object;

  constructor( private service: SaisieService,
               private fb: FormBuilder,
               private toastr: MyToasterService,
               private modalService: BsModalService,
               private authService: AuthenticationService) { }


  rowSelected(grid: RowSelectEventArgs) {
    let selectedrecords: object[] = this.grid.getSelectedRecords();
    this.tailleSelect = (selectedrecords).length;
    console.log(selectedrecords)
    this.selectedrecords = (selectedrecords);
  }

  rowDeSelected(grid: RowSelectEventArgs) {
    let selectedrecords: object[] = this.grid.getSelectedRecords();
    console.log(selectedrecords)
    this.tailleSelect = (selectedrecords).length;
    this.selectedrecords = (selectedrecords);
  }
  customiseCell(grid:RowDataBoundEventArgs) {
    const id = ((grid.row as HTMLTableRowElement));
    this.grid.deleteRow(id);
  }
  dataBound(args) {
    // this.grid.autoFitColumns('checkbox');
    // this.grid.autoFitColumns('id');
    // this.grid.autoFitColumns('username');
    // this.grid.autoFitColumns('nom');
    // this.grid.autoFitColumns('prenom');
    this.grid.autoFitColumns('fonction');
     this.grid.autoFitColumns('roles');
    // this.grid.autoFitColumns('actived');
  }
  ngOnInit(): void {
    this.filter = { type: "CheckBox" };
    this.selectionSettings = {persistSelection: true, type: "Multiple", checkboxOnly: true };
    this.getAllUsers();
    this.getAllRoles();
    this.initForm();
  }
  initForm() {
    this.register = this.fb.group({
      username: ['', [Validators.required,],],
      nom: ['', [Validators.required,],],
      prenom: ['', [Validators.required,],],
      fonction: ['', [Validators.required,],],
      roles: ['', [Validators.required,],],
      //password: ['', [Validators.required,],],
      password:['',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        //this.validatePassword
      ])],
      confirmedPassword: ['', Validators.required]
    },{validator:this.matchingPasswords('password','confirmedPassword')});
  }

  matchingPasswords(password,confirmedPassword){
    return (group:FormGroup)=>{
      if(group.controls[password].value === group.controls[confirmedPassword].value){
        return null;
      }else{
        return {'matchingPasswords':true};
      }
    }
  }


  addMatricule( msg: any, timem: number) {
    this.alertsMatricule.push({
      //type: typem,
      msg: msg ,
      timeout: timem
    });
  }
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
  async getAllRoles(){
    try {
      const res = await this.authService.getAllRoles().toPromise();
      this.tabroles=(res)
      console.log(this.users)
    }catch (e) {
      console.log(e)
    }
  }

  async onActived(){
     this.btnValidation = true;
    console.log(this.tailleSelect)
    let fin = 0;
    for (let i = 0; i < this.tailleSelect; i++) {
      console.log(this.selectedrecords[i])
      try {
        const data = (this.selectedrecords[i].username,this.selectedrecords[i].actived,this.selectedrecords[i].id);
        const res  = await this.authService.updateActivation(this.selectedrecords[i]).toPromise();
        console.log(res);
        if (res.status === 200){
          fin = fin +1;
          if (fin===this.tailleSelect){
            this.getAllUsers();
            this.toastr.showToast('Gestion Utilisateur', "Mise à jour reussie", 4000,'success')
            // this.element.show({
            //   title: 'Success   !', content: 'Mise à jour reussie .', cssClass: 'e-toast-success'
            // });
            setTimeout(()=>{
              this.btnValidation =false;
              this.tailleSelect = 0
            },100)
          }
        }
      }catch (e) {
        console.log(e.error)
      }
    }
  }
  async getAllUsers(){
    try {
      const res = await this.authService.getAllUsers().toPromise();
      this.users=(res)
      console.log(this.users)
    }catch (e) {
      console.log(e)
    }
  }

  async saveUser(){
    console.log(this.register.value)
    try {
      await this.authService.saveUser(this.register.value).toPromise();
      this.initForm()
      this.getAllUsers()
      this.modalRef.hide()
      this.toastr.showToast('Gestion Utolisateur', "Utilisateur a ete enregistrer avec succes", 4000,'success')
    }catch (e) {
      this.errorMatricule=true
      this.addMatricule( e.error, 4000);
      console.log(e.error)
    }
  }

  openModal(template: TemplateRef<any>) {
    this.initForm()
    this.errorMatricule= false
    this.modalRef = this.modalService.show(template, {class: 'modal-lg', ignoreBackdropClick: true});

  }
  clearInput(){
    this.errorMatricule=false;
  }

  decline(): void {
    this.modalRef.hide();
    //this.bSave = false;
  }
}
