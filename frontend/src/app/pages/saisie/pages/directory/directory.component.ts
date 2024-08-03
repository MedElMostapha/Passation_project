import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GridComponent, RowDeselectEventArgs, RowSelectEventArgs} from "@syncfusion/ej2-angular-grids";
import {DirectoryService} from "../../../../services/directory.service";
import {CHEMIN, PLIS, REPORTS} from "../../../../enums/constants";
import {saveAs} from "file-saver";
import {DialogComponent, PositionDataModel} from "@syncfusion/ej2-angular-popups";
import {FormBuilder, Validators} from "@angular/forms";
import {PaaService} from "../../../../services/paa.service";
import {PlisService} from "../../../../services/plis.service";
import { ProcedurePaaService } from 'src/app/services/procedure.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @ViewChild('grid') public grid: GridComponent;
  public data: any;
  reportType=REPORTS
  rootPath = CHEMIN.UPLOAD;
  PLIS = PLIS;
  cpass = false;
  @ViewChild('container', {read: ElementRef, static: true}) container: ElementRef;
  public positionModal: PositionDataModel = {X: 450, Y: 100};
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('ejDialogPlis') ejDialogPlis: DialogComponent;
  @ViewChild('dialogImpressionLettres') dialogImpressionLettres: DialogComponent;
  public targetElement: HTMLElement;
  public DialogObj;
  public DialogObjPlis;
  public DialogObjImpressionLettre;
  selectedDirectory: Object[];
  lettersById: any;
  lettersByQuery: any;
  formPostPlis = this.fb.group({
    idLettre: [, Validators.required],
    posteOuCourrierExpress: [, Validators.required],
    porteur: [, Validators.required],
    observation: ['', Validators.required],
    dateReception: ['', Validators.required],

  });
  plisByDir: any;
  initVal: any;

  constructor(private procedurePaaService: ProcedurePaaService,private plisService: PlisService, private directoryService: DirectoryService, private fb: FormBuilder, private paaService: PaaService,) {
  }

  ngOnInit(): void {
    this.getDirectories();
  }

  getDirectories() {
    const res = this.directoryService.getAllDossier().subscribe({
      next: (value) => {
        // tslint:disable-next-line:no-console
        // console.log("les dossier : " +JSON.stringify(value))
        this.data = value
      },
      error: (e) => {
        // tslint:disable-next-line:no-console
        console.log(e);
      }
    });
  }

  imprimer(id,reportType) {
    this.paaService.telechargerPieceJointe(id, reportType).subscribe((value: Blob) => {
      console.log(value);
      const blob = new Blob([value], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    }, (error) => {
      console.log(error);

    }, () => {
      console.log('completed');
    });
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

  validation(e) {
    if (this.cpass) {
      e.cancel = false;
    } else {
      e.cancel = true;
    }
  }

  private cancelClick(): void {
    this.DialogObj.hide();
    this.DialogObjPlis.hide();
    this.DialogObjImpressionLettre.hide();
  }

  public declancherLettres = (event: any): void => {
    this.cpass = true;
    // console.log("le paa selectionnee : "+JSON.stringify(this.selectedDirectory[0]["paa"]["etablissement"]["nom"]));
    
    this.validerFormLettres.get("nonAutoriteContractante").patchValue(this.selectedDirectory[0]["paa"]["etablissement"]["nom"])
    this.validerFormLettres.get("lieuOverturePlis").patchValue(this.selectedDirectory[0]["paa"]["etablissement"]["nom"])
    this.ejDialog.show();
  };

  getLettres(id: any) {
    this.directoryService.getLetters(id).subscribe(
      {
        next: (value) => {
          this.lettersById = value;
          //console.log(value)
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public declancherImpressionLettres = (event: any, id: any): void => {
    this.cpass = true;
    this.getLettres(id);
    this.getLettresByQuery(id);
    this.getLettresByDir(id);
    this.dialogImpressionLettres.show();
  };

  validerFormLettres = this.fb.group({
    nomFournissuer1: [null, Validators.required],
    nomFournissuer2: [null, Validators.required],
    nomFournissuer3: [null, Validators.required],
    nonAutoriteContractante: [null, Validators.required],
    dateLimiteDepot: [null, Validators.required],
    dateAnterieurDepot: [null, Validators.required],
    dateOverturePlis: [null, Validators.required],
    lieuOverturePlis: [null, Validators.required],
  });
  selectedPlis: any;


  upload() {
    const f1 = this.validerFormLettres.get('nomFournissuer1').value;
    const f2 = this.validerFormLettres.get('nomFournissuer2').value;
    const f3 = this.validerFormLettres.get('nomFournissuer3').value;
    const ob = {
      ...this.validerFormLettres.value, 'fournisseurs': [f1, f2, f3], 'idDossier': this.selectedDirectory[0]['id'],
      'fkIduser': 4
    }
    console.log(ob, this.selectedDirectory['id']);
    this.directoryService.createLetters(ob).subscribe(
      {
        next: (value) => {
          this.getDirectories();
          this.ejDialog.hide();
          this.validerFormLettres.reset();
        },
        error: (error) => {
          console.log(error);
        },
      });
    // this.next();
  }

  rowSelected(args: RowSelectEventArgs) {
    console.log(this.grid.getSelectedRecords())
    this.selectedDirectory = this.grid.getSelectedRecords();
    this.validerFormLettres.reset();
  }

  rowDeselected($event: RowDeselectEventArgs) {
    this.selectedDirectory = null;
    //console.log(this.selectedPaa)
  }

  declancherPlis($event: MouseEvent, id) {
    this.cpass = true;
    this.getLettres(id);
    this.ejDialogPlis.show();

  }

  getLettresByQuery(id) {
    this.directoryService.getLettresByQuery(id).subscribe(
      {
        next: (value) => {
          this.lettersByQuery = value;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getLettresByDir(id) {
    this.plisService.getListPlisByDir(id).subscribe(
      {
        next: (value) => {
          this.initVal = this.lettersById
          this.initVal.map(l=>{
            const res = value.filter(p=>l.id===p.idLettre);
            Object.assign(l,{plis:res})
          })
          console.log(this.initVal)
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  validerCreationPlis() {
    //Number(this.formPostPlis.get('idLettre').value)
    Object.assign(this.formPostPlis.value, {
      idDossier: this.data[0].id,
      idLettre: Number(this.formPostPlis.get('idLettre').value),
      posteOuCourrierExpress:Number(this.formPostPlis.get('posteOuCourrierExpress').value)
    })
    console.log(this.formPostPlis.value);
    this.plisService.createPlis(this.formPostPlis.value).subscribe(
      {
        next: (value) => {
          this.formPostPlis.reset();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
