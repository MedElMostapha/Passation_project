import { Component, OnInit } from '@angular/core';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { SERVER_URL_BE } from 'src/environments/environment';

@Component({
  selector: 'app-etablissement-select',
  templateUrl: './etablissement-select.component.html',
  styleUrls: ['./etablissement-select.component.scss']
})
export class EtablissementSelectComponent implements OnInit {

  items: any[] = [];
  selectedItem: any;
  http: any;
  paaData: any;
  itemselected: any;

  constructor(private etablissementService: EtablissementService) { }

  ngOnInit(): void {
    this.loadEtablissements();
  }

  onSelect(item: any): void {
    // if (item) {
    //   this.http.get(`${SERVER_URL_BE}api/rest/Paa/${item.id}`).subscribe(data => {
    //     this.paaData = data;
    //     console.log("Les données PAA :", this.paaData);
    //   });
    // }

    this.itemselected = item;
    
  }

  selected() {
    return this.itemselected;
  }

  loadEtablissements(): void {
    this.etablissementService.getEtablissements().subscribe(data => {
      // Ajouter une propriété combinée pour afficher à la fois l'ID et le nom
      this.items = data.map((item: any) => ({
        ...item,
        displayName: `${item.id}  - ${item.nom} `
      }));
      console.log("Les établissements :", this.items);
    });
  }
}
