import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridComponent, RowDeselectEventArgs, RowSelectEventArgs } from "@syncfusion/ej2-angular-grids";
import { PaaService } from "../../../../../services/paa.service";
import { DialogComponent, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from "../../../../../services/file.service";
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { GED_TBL, REPORTS } from '../../../../../enums/constants';
import { DirectoryService } from "../../../../../services/directory.service";
import { saveAs } from "file-saver";
import { OffcanvasComponent } from 'src/app/components/offcanvas/offcanvas.component';
import { EtablissementSelectComponent } from '../../etablissement-select/etablissement-select.component';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ProcedurePaaService } from 'src/app/services/procedure.service';
import { ProcedurePaa } from 'src/app/models/procedure.model';
import { MyToasterService } from 'src/app/services/my-toaster.service';

@Component({
  selector: 'app-paa',
  templateUrl: './paa.component.html',
  styleUrls: ['./paa.component.scss'],
  providers: [DatePipe]
})
export class PaaComponent implements OnInit {
  cpass = false;

  @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef;
  public positionModal: PositionDataModel = { X: 450, Y: 100 };
  public positionModalDetail: PositionDataModel = { X: 330, Y: 50 };
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('dialogDossier') dialogDossier: DialogComponent;
  @ViewChild('dialogDetail') dialogDetail: DialogComponent;
  public targetElement: HTMLElement;
  public DialogObj;
  public dialogDossierObj;
  public dialogDossierDetail;
  public pageSettings: Object;

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('grid') public grid: GridComponent;
  selectedPaaId: number | null = null;

  GED_TBL = GED_TBL;
  REPORTS = REPORTS;
  data: any;
  prenom = localStorage.getItem("prenom");
  nom = localStorage.getItem("username");
  selectedPaa: Object[] = null;
  errorMsg = '';
  showNewRow: boolean = false;
  modifierRow: boolean = false;
  newRowForm: FormGroup;
  modifierForm: FormGroup;
  validerFormDeclanchement: FormGroup;

  headerText: String = "Plan annuel de ";

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  selectedItem: any;

  fileInfos: Observable<any>;
  btnValider = false;
  idDir: any;
  PaaFile: any;

  detaille: any;

  paaId: any;
  items: any;

  constructor(
    private datePipe: DatePipe,
    private paaService: PaaService,
    private directoryService: DirectoryService,
    private fileService: FileService,
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private procedurePaaService: ProcedurePaaService,
    private http: HttpClient,
    private toastr : MyToasterService
  ) {

    this.pageSettings = { pageSize: 10 };
    this.myDateYear = this.datePipe.transform(this.myDateYear, 'yyyy');
    this.newRowForm = this.fb.group({
      inpuBudgetaire: ["", Validators.required],
      mntEstimatif: ['', [Validators.required]],
      objetDepense: ['', Validators.required],
      datePreviLancement: ['', Validators.required],
      datePreviAttribution: ['', Validators.required]
    });

    this.modifierForm = this.fb.group({
      id: ['', Validators.required],
      inpuBudgetaire: ['', Validators.required],
      mntEstimatif: ['', Validators.required],
      objetDepense: ['', Validators.required],
      datePreviLancement: ['', Validators.required],
      datePreviAttribution: ['', Validators.required]
    });


    this.validerFormDeclanchement = this.fb.group({
      file:["",Validators.required],
      origin: ["", Validators.required],
      destinataire: ["", Validators.required],
      description: ["", Validators.required],
      deadlineEstime: ["", Validators.required],
      sourceFinanciere: ["", Validators.required],
      montant: ["", Validators.required],
    });

 

  }

  ngOnInit(): void {
    this.getPaa();
    this.initFormCreateDir();
    this.fileInfos = this.fileService.getFiles();
    this.loadEtablissements();
  }

  @ViewChild(OffcanvasComponent) offcanvas: OffcanvasComponent;
  @ViewChild(EtablissementSelectComponent) etablisementSelect: EtablissementSelectComponent;

  toggleOffcanvas(id: any) {
    this.offcanvas.toggleOffcanvas("PAA");
    console.log("l'id du paa : " + id);
    this.offcanvas.detaillePaa(id);
  }

  onFileInputClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.paaService.uploadFile(file).subscribe({
        next: () => {
          console.log("le fichier est uploadee");
          this.toastr.showToast('Upload', "Plan annuel importé !", 4000,'success')

          this.getPaa();
        }
      }
      
        
      );
    } else {
      this.message = 'Please select a file first.';
    }
  }

  onDataBound() {
    this.grid.groupModule.collapseAll();
  }

  
  

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onSelectPaa(paa: any) {
    this.selectedPaaId = paa.id;
  }

  upload(gedTbl: any, idElmn: any) {
    this.message = '';
    this.errorMsg = '';
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.fileService.upload(this.currentFile, idElmn, 4, gedTbl).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.fileService.getFiles();
          if (this.progress === 100) {
            this.btnValider = true;
            this.currentFile = null;
            if (gedTbl === GED_TBL.EXPRESSION_BESOIN) {
              // this.btnValiderDeclanchement();
            } else {
              this.formCreationDir.reset();
              this.dialogDossier.hide();
              this.getPaa();
            }
          }
        }
      },
      err => {
        this.progress = 0;
        console.log(err);
        this.errorMsg = err.error.message;
        this.currentFile = undefined;
      });
  }


  getPaa() {
   this.paaService.getPaa().subscribe({
      next: (value) => {
       
        // console.log("paa : "+JSON.stringify(value));
        

       this.data = value;
       
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  onSelect(item: any): void {
    if (item) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get(`http://localhost:8081/api/rest/Paa/etablissement/${item.id}`, { headers }).subscribe({
        next: (value) => {
          this.data = value;
        },
        error: () => {
          this.data = "pas des donnees";
        }
      });
    } else {
      this.getPaa();
    }

  }

  loadEtablissements(): void {
    this.etablissementService.getEtablissements().subscribe(data => {
      this.items = data.map((item: any) => ({
        ...item,
        displayName: `${item.id}  | ${item.nom} `
      }));
      // console.log("Les établissements :", this.items);
    });
  }

  validerPaa(id: any) {
    const res = this.paaService.validerPaa(id).subscribe({
      next: () => {
        this.getPaa();
      }
    });
  }

  // private cancelClick(): void {
  //   this.DialogObj.hide();
  //   this.validerFormDeclanchement.reset();
  //   this.dialogDossierObj.hide();
  //   this.dialogDossierDetail.hide();
  // }

  public declancherProcedure = (event: any): void => {
    this.btnValider = false;
    this.cpass = true;
    this.ejDialog.show();

    this.validerFormDeclanchement.get("destinataire").patchValue(this.nom)
    this.validerFormDeclanchement.get("sourceFinanciere").patchValue(this.selectedPaa[0]['inpuBudgetaire'])
  };

  public declancherDetail = (event: any): void => {
    this.cpass = true;
    this.getFilesForPaa();
  };

  getFilesForPaa() {
    console.log(this.selectedPaa[0]['id'], GED_TBL.EXPRESSION_BESOIN);
    this.fileService.getDirPaa(this.selectedPaa[0]['id'], GED_TBL.EXPRESSION_BESOIN).subscribe({
      next: (value) => {
        // console.log(value);
        this.PaaFile = value;
        this.dialogDetail.show();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  validation(e) {
    this.message = '';
    if (this.cpass) {
      e.cancel = false;
    } else {
      e.cancel = true;
    }
  }

  rowSelected(args: RowSelectEventArgs) {
    console.log(this.grid.getSelectedRecords());
    this.selectedPaa = this.grid.getSelectedRecords();
    console.log("le paa : " + this.selectedPaa[0]["id"]);
    this.paaId = this.selectedPaa[0]["id"];
    this.modifierForm.get('id')?.patchValue(this.selectedPaa[0]["id"]);
    this.modifierForm.get('inpuBudgetaire')?.patchValue(this.selectedPaa[0]["inpuBudgetaire"]);
    this.modifierForm.get('mntEstimatif')?.patchValue(this.selectedPaa[0]["mntEstimatif"]);
    this.modifierForm.get('objetDepense')?.patchValue(this.selectedPaa[0]["objetDepense"]);
    this.modifierForm.get('datePreviLancement')?.patchValue(this.selectedPaa[0]["datePreviLancement"]);
    this.modifierForm.get('datePreviAttribution')?.patchValue(this.selectedPaa[0]["datePreviAttribution"]);
    this.initFormCreateDir();
  }

  rowDeselected($event: RowDeselectEventArgs) {
    this.selectedPaa = null;
    console.log(this.selectedPaa);
  }

 

  imprimer(id, idTbl) {
    this.paaService.telechargerPieceJointe(id, idTbl).subscribe((value: Blob) => {
      console.log(value);
      const blob = new Blob([value], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, (error) => {
      console.log(error);
    }, () => {
      console.log('completed');
    });
  }

  downloadFile(fileData: any): void {
    this.directoryService.download(fileData.fileNameOnDisc, fileData.fileSubFolder).subscribe(blob => saveAs(blob, fileData.fileNameOnDisc));
  }

  CreationDossier($event: MouseEvent) {
    this.cpass = true;
    this.message = '';
    this.errorMsg = '';
    this.dialogDossier.show();
    this.btnValider = false;
  }

  addNewRow() {
    if (this.newRowForm.valid) {
      this.ajouterPaa();
      // console.log('Nouvelle ligne ajoutée :', this.newRowForm.value);
      this.newRowForm.reset();
      this.showNewRow = false;
    }
  }

  modifierPaa(id: any) {
    console.log("le paa a modifier : " + id);
    const nouveauPaa = {
      inpuBudgetaire: this.modifierForm.get('inpuBudgetaire').value,
      mntEstimatif: this.modifierForm.get('mntEstimatif').value,
      objetDepense: this.modifierForm.get('objetDepense').value,
      datePreviLancement: this.modifierForm.get('datePreviLancement').value,
      datePreviAttribution: this.modifierForm.get('datePreviAttribution').value
    };
    this.paaService.modifierPaa(id, nouveauPaa).subscribe({
      next: (value) => {
        console.log("modifier avec succee");
        this.getPaa();
      }
    });
  }

  ajouterPaa(): void {
    const nouveauPaa = {
      inpuBudgetaire: this.newRowForm.get('inpuBudgetaire').value,
      mntEstimatif: this.newRowForm.get('mntEstimatif').value,
      objetDepense: this.newRowForm.get('objetDepense').value,
      datePreviLancement: this.newRowForm.get('datePreviLancement').value,
      datePreviAttribution: this.newRowForm.get('datePreviAttribution').value
    };
    this.paaService.addPaa(nouveauPaa).subscribe(
      (response) => {
        console.log('PAA ajouté avec succès:', response);
        this.newRowForm.reset();
        this.showNewRow = false;
        this.getPaa();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du PAA:', error);
      }
    );
  }

  supprimerPaa(id: number): void {
    this.paaService.supprimerPaa(id).subscribe(
      (response) => {
        console.log('PAA supprimée avec succès:', response);
        this.getPaa();
      },
      (error) => {
        this.getPaa();
        console.error('Erreur lors de la suppression de la PAA:', error);
      }
    );
  }

  formCreationDir: FormGroup;
  myDateYear: any = new Date();

  initFormCreateDir() {
    if (this.selectedPaa != null) {
      this.formCreationDir = this.fb.group({
        reference: [this.selectedPaa[0]['id'] + '/' + this.myDateYear, Validators.required],
        objetDepense: [this.selectedPaa[0]['objetDepense'], Validators.required],
        inpuBudgetaire: [this.selectedPaa[0]['inpuBudgetaire'], Validators.required],
        file: ['', Validators.required],
      });
    } else {
      this.formCreationDir = this.fb.group({
        reference: ['/' + this.myDateYear, Validators.required],
        objetDepense: ['', Validators.required],
        inpuBudgetaire: ['', Validators.required],
        file: ['', Validators.required],
      });
    }
  }

  validerCreationDir() {
    const obj = { reference: this.formCreationDir.get('reference').value, idPaa: this.selectedPaa[0]['id'], fkIduser: 4 };
    this.paaService.validateCreateDir(obj).subscribe({
      next: (value) => {
        this.idDir = value.id;
        this.upload(GED_TBL.INITIATION_PROCEDURE, this.idDir);
        this.message = '';
        this.errorMsg = '';
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createProcedure() {
    if (this.validerFormDeclanchement.valid) {
      const file = this.selectedFiles[0];
      const procedureData = {
        paa: {id: this.selectedPaa[0]['id']},
        origin:this.validerFormDeclanchement.get("origin").value,
        destinataire:this.validerFormDeclanchement.get("destinataire").value,
        description:this.validerFormDeclanchement.get("description").value,
        deadlineEstime:this.validerFormDeclanchement.get("deadlineEstime").value,
        sourceFinanciere:this.validerFormDeclanchement.get("sourceFinanciere").value,
        montant:this.validerFormDeclanchement.get("montant").value
      
      };
      // console.log("l'id du paa : "+this.validerFormDeclanchement.get("origin").value);

      if (file) {
        this.procedurePaaService.createProcedure(procedureData, file).subscribe({
          next: () => {
            this.ejDialog.hide();
          }
        });
      } else {
        console.error('No file selected');
      }
    } else {
      console.error('Form is invalid');
    }

    // console.log("la valeur du formulaire : "+this.validerFormDeclanchement.get("origin").value);
    
  }

  download(filePath: any,dossier:any): void {
    this.procedurePaaService.downloadFile(filePath,dossier).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filePath.split('/').pop() || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('File download error:', error);
      }
    );
  }

}
