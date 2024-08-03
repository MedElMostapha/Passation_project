import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { DialogComponent, PositionDataModel } from '@syncfusion/ej2-angular-popups';
import { GridComponent, RowDeselectEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {
  etablissementForm: FormGroup;
  etablissements = [];
  selectedEtablissement: any;
  isModalVisible = false;
  isEditMode = false;
  positionModal: PositionDataModel = { X: 'center', Y: 'center' };
  targetElement: HTMLElement;
  pageSettings: Object = { pageSize: 10 };

  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @ViewChild('grid') public grid: GridComponent;

  constructor(private fb: FormBuilder, private etablissementService: EtablissementService) {
    this.etablissementForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEtablissements();
    this.initilaizeTarget();
  }

  loadEtablissements(): void {
    this.etablissementService.getEtablissements().subscribe(data => {
      this.etablissements = data;
    });
  }

  openAddModal(): void {
    this.isModalVisible = true;
    this.isEditMode = false;
    this.etablissementForm.reset();
    this.ejDialog.show();
  }

  editEtablissement(): void {
    if (this.selectedEtablissement) {
      this.isModalVisible = true;
      this.isEditMode = true;
      this.etablissementForm.patchValue(this.selectedEtablissement);
      this.ejDialog.show();
    }
  }

  onSubmit(): void {
    if (this.etablissementForm.valid) {
      if (this.isEditMode) {
        const updatedEtablissement = { ...this.selectedEtablissement, ...this.etablissementForm.value };
        this.etablissementService.updateEtablissement(updatedEtablissement).subscribe(
          () => {
            this.loadEtablissements();
            this.ejDialog.hide();
          },
          error => console.error(error)
        );
      } else {
        this.etablissementService.addEtablissement(this.etablissementForm.value).subscribe(
          () => {
            this.loadEtablissements();
            this.ejDialog.hide();
          },
          error => console.error(error)
        );
      }
      this.isModalVisible = false;
      this.etablissementForm.reset();
    }
  }

  rowSelected(args: RowSelectEventArgs): void {
    this.selectedEtablissement = this.grid.getSelectedRecords()[0];
  }

  rowDeselected($event: RowDeselectEventArgs): void {
    this.selectedEtablissement = null;
  }

  deleteEtablissement(): void {
    if (this.selectedEtablissement) {
      this.etablissementService.deleteEtablissement(this.selectedEtablissement.id).subscribe(
        () => this.loadEtablissements(),
        error => console.error(error)
      );
      this.selectedEtablissement = null;
    }
  }

  initilaizeTarget(): void {
    this.targetElement = document.body;
  }
}
