import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridComponent, RowDeselectEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { DialogComponent, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MyToasterService } from 'src/app/services/my-toaster.service';
import { PaaService } from 'src/app/services/paa.service';
import { ProcedurePaaService } from 'src/app/services/procedure.service';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss']
})
export class OffcanvasComponent implements OnInit {

  detaille: any;
  user: any;
  viewType: string = 'PAA'; // Default view type


  public pageSettings: Object;
  selectedPaa: any;

  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  public positionModal: PositionDataModel = { X: 450, Y: 100 };
  public targetElement: HTMLElement;
  progress = 0;



  modifierForm: FormGroup;
  nom = localStorage.getItem("username");


  etablissement: any;
  btnValider = false;
  modifierRow: boolean = false;
  newRowForm: FormGroup;
  showNewRow: boolean = false;
  detaillLigne: boolean = false;
  errorMsg = '';

  selectedFiles: FileList;
  currentFile: File;


  cpass = false;

  validerFormDeclanchement: FormGroup;
  message: string;
  paaid: any;

  




  constructor(private paaService: PaaService, private auth: AuthenticationService, private procedureService: ProcedurePaaService, private http: HttpClient, private fb: FormBuilder,
    private procedurePaaService: ProcedurePaaService,    private toastr: MyToasterService,


  ) {
    this.pageSettings = { pageSize: 10 };

    this.newRowForm = this.fb.group({
      inpuBudgetaire: ["", Validators.required],
      mntEstimatif: ['', [Validators.required]],
      objetDepense: ['', Validators.required],
      datePreviLancement: ['', Validators.required],
      datePreviAttribution: ['', Validators.required]
    });

    this.modifierForm = this.fb.group({
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

  ngOnInit(): void { }

  showOffcanvas = false;

  toggleOffcanvas(viewType: string) {
    this.showOffcanvas = !this.showOffcanvas;
    this.viewType = viewType;
    this.selectedPaa = null;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  validation(e) {
    this.message = '';
    if (this.cpass) {
      e.cancel = false;
    } else {
      e.cancel = true;
    }
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
            this.detaillePaa(this.paaid)
            this.toastr.showToast('Procedure', "Procedure declanché !", 4000,'success')

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

  rowSelected(args: RowSelectEventArgs) {
    console.log(this.grid.getSelectedRecords());
    this.selectedPaa = this.grid.getSelectedRecords();
    console.log("le paa : " + this.selectedPaa[0]["id"]);
   
  }

  rowDeselected($event: RowDeselectEventArgs) {
    this.selectedPaa = null;
    this.modifierRow = null;
    this.addNewRow = null;
    console.log(this.selectedPaa);
  }

  public declancherProcedure = (event: any): void => {
    this.btnValider = false;
    this.cpass = true;
    this.ejDialog.show();

    this.validerFormDeclanchement.get("destinataire").patchValue(this.nom)
    this.validerFormDeclanchement.get("origin").patchValue(this.etablissement)
    this.validerFormDeclanchement.get("sourceFinanciere").patchValue(this.selectedPaa[0]['inpuBudgetaire'])
  };

  addNewRow() {
    if (this.newRowForm.valid) {
      this.ajouterPaa();
      console.log('Nouvelle ligne ajoutée :', this.newRowForm.value);
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
        this.detaillePaa(this.paaid);
        this.modifierRow = null;
        this.toastr.showToast('Ligne', "Ligne modifié !", 4000,'success')

        // this.getPaa();
      }
    });
  }

  modifierbtn() {

    this.modifierRow = !this.modifierRow
    this.modifierForm.get("inpuBudgetaire").patchValue(this.selectedPaa[0]['inpuBudgetaire'])
    this.modifierForm.get("objetDepense").patchValue(this.selectedPaa[0]['objetDepense'])
    this.modifierForm.get("datePreviLancement").patchValue(this.selectedPaa[0]['datePreviLancement'])
    this.modifierForm.get("datePreviAttribution").patchValue(this.selectedPaa[0]['datePreviAttribution'])
    this.modifierForm.get("mntEstimatif").patchValue(this.selectedPaa[0]['mntEstimatif'])


    
  }

  ajouterPaa(): void {
    const nouveauPaa = {
      paaid:this.paaid,
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
        // this.getPaa();
        this.detaillePaa(this.paaid);
        this.toastr.showToast('Ligne', "Ligne ajouté !", 4000,'success')

      },
      (error) => {
        console.error('Erreur lors de l\'ajout du PAA:', error);
      }
    );
  }

  detaillePaa(id: any): any {
    this.paaService.getDetaillPaa(id).subscribe({
      next: (value) => {

        let found = false;
        this.detaille = value;
        this.viewType = 'PAA';
        value.forEach(v => {

          
          if (!found) {
            this.etablissement = v.etablissement.nom;
            this.paaid = v.paa.id;
            console.log("l'etablissement : "+this.paaid);
            
            found = true;
            
          }

          
          
        });
        found = false;
        // console.log("les detail de paa : "+JSON.stringify(value));
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  validerPaa(id: any) {
    const res = this.paaService.validerPaa(id).subscribe({
      next: () => {
        this.detaillePaa(this.paaid);
        this.toastr.showToast('Ligne', "Ligne validé !", 4000,'success')


      }
    });
  }

  supprimerPaa(id: number): void {
    this.paaService.supprimerPaa(id).subscribe(
      {
        next: () => {
          this.detaillePaa(this.paaid);
          this.toastr.showToast('Ligne', "Ligne supprimmé !", 4000,'success')


        }
      }
    );
  }

  detailleProcedure(id: any): any {
    this.procedureService.getProcedureById(id).subscribe({
      next: (value) => {
        this.detaille = value;
        this.viewType = 'Procedure';
        // console.log("la procedure : " + value);
      }
    });
  }

  getFileName(path: string): string {
    return path ? path.split('/').pop() : '';
  }
  
  download(filePath: any,dossier:any): void {
    this.procedureService.downloadFile(filePath,dossier).subscribe(
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
  
  removeBeforeLastUnderscore(filename) {
    const lastUnderscoreIndex = filename.lastIndexOf('_');
    if (lastUnderscoreIndex === -1) {
        return filename; // Return the original string if no underscore is found
    }
    return filename.substring(lastUnderscoreIndex + 1);
}
  
}
