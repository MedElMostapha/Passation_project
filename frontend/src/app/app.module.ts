import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AlertModule} from 'ngx-bootstrap/alert';

import {Ng2SearchPipeModule} from 'ng2-search-filter';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {NgSelectModule} from '@ng-select/ng-select';
import {DefaultSidebarComponent} from './components/default-sidebar/default-sidebar.component';
import {MenuAllModule, SidebarModule, TreeViewAllModule, TreeViewModule,} from '@syncfusion/ej2-angular-navigations';
// import {SelectionType } from '@swimlane/ngx-datatable/src/ ';
// import { ColumnMode } from '@swimlane/ngx-datatable/lib/types/column-mode.type';
import {ListViewAllModule, ListViewModule} from '@syncfusion/ej2-angular-lists';
// Syncfusion ej2-angular-popups module
// grid
import {DialogModule, TooltipModule} from '@syncfusion/ej2-angular-popups';

// import the GridModule for the Grid component
import {
  AggregateService,
  ColumnMenuService,
  EditService,
  FilterService,
  GridModule,
  GroupService,
  PagerModule,
  PageService,
  ResizeService,
  SortService,
  ToolbarService,
  VirtualScrollService
} from '@syncfusion/ej2-angular-grids';
import {DropDownListModule, DropDownTreeModule} from '@syncfusion/ej2-angular-dropdowns';
// Angular Material Components
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ProgressbarModule} from "ngx-bootstrap/progressbar";

import {ButtonModule, RadioButtonModule} from '@syncfusion/ej2-angular-buttons';

import {TabsModule} from 'ngx-bootstrap/tabs';
import {InterceptorService} from "./services/interceptor.service";

import {
  AreaSeriesService,
  CategoryService,
  ChartModule,
  ColumnSeriesService,
  DataLabelService,
  DateTimeService,
  LegendService,
  LineSeriesService,
  MultiColoredLineSeriesService,
  ParetoSeriesService,
  SplineAreaSeriesService,
  SplineSeriesService,
  StackingLineSeriesService,
  StepLineSeriesService,
  TooltipService,
  ZoomService
} from '@syncfusion/ej2-angular-charts';
import {DataTablesModule} from 'angular-datatables';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {AccueilComponent} from './pages/saisie/pages/accueil/accueil.component';
import {ToastModule} from '@syncfusion/ej2-angular-notifications';
import {ButtonComponent} from './components/button/button.component';

import {NgxSpinnerModule} from "ngx-spinner";
import {PaaComponent} from './pages/saisie/pages/paa/paa/paa.component';
import {TableEj2Component} from './components/table-ej2/table-ej2.component';
import {PageContentHeaderComponent} from './components/page-content-header/page-content-header.component';
import {DirectoryComponent} from './pages/saisie/pages/directory/directory.component';
import { EtablissemntPaaComponent } from './pages/saisie/pages/etablissemnt-paa/etablissemnt-paa.component';
import { EtablissementSelectComponent } from './pages/saisie/pages/etablissement-select/etablissement-select.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { EtablissementComponent } from './pages/saisie/pages/etablissement/etablissement.component';
import { InputBudgetaireComponent } from './pages/saisie/pages/input-budgetaire/input-budgetaire.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultSidebarComponent,
    AccueilComponent,
    ButtonComponent,
    PaaComponent,
    TableEj2Component,
    PageContentHeaderComponent,
    DirectoryComponent,
    EtablissemntPaaComponent,
    EtablissementSelectComponent,
    OffcanvasComponent,
    ProcedureComponent,
    EtablissementComponent,
    InputBudgetaireComponent,
  ],
  imports: [
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    NgSelectModule,
    SidebarModule,
    TreeViewAllModule,
    ListViewModule,
    TooltipModule,
    GridModule,
    DialogModule,
    DropDownTreeModule,
    PagerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ProgressbarModule,
    TreeViewModule,
    ListViewAllModule,
    DropDownListModule,
    MenuAllModule,
    RadioButtonModule,
    ButtonModule,
    DataTablesModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    ToastModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    BsModalService,
    CategoryService, LegendService, DataLabelService, LineSeriesService, StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
    SplineAreaSeriesService, DateTimeService, StepLineSeriesService, LegendService, TooltipService, CategoryService, ColumnSeriesService
    , MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService, AreaSeriesService, LegendService, ZoomService,
    GroupService,
    SortService,
    PageService,
    ToolbarService,
    EditService,
    ToolbarService,
    ResizeService,
    ColumnMenuService,
    FilterService,
    VirtualScrollService,
    LoginComponent,
    AggregateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
