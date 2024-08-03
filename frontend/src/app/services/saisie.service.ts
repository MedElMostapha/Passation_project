import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SERVER_URL_BE2,SERVER_URL_BE3, SERVER_URL_BE, SERVER_URL_FE,SERVER_URL_BEPing } from '../../environments/environment';
import {Users} from '../models/users.model';
@Injectable({
  providedIn: 'root'
})
export class SaisieService {

  constructor(private http: HttpClient, ) { }

     // Changement de compte et de Position
  getUnMatricule(matricule: any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TdonneAdmin/unMatricule/' + matricule).pipe();
  }
  getAdminCdService(cdSErvice:any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TdonneAdmin/getService/'+cdSErvice).pipe();
  }
  SaveComptePosition(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'MvmPersonne/SaveSaisie',body).pipe();
  }

  SaveImportPosition(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'MvmPersonne/SaveImportPosition',body).pipe();
  }
  getPositions(): Observable<any>{
    return  this.http.get(SERVER_URL_BE2+'/t_ref_positions').pipe();
  }

  getMvmPers(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'MvmPersonne/Personnels').pipe();
  }

  SaveInAdminPersonne(data,matricule_validateur): Observable<any> {
    return  this.http.patch(SERVER_URL_BE+'MvmPersonne/updateAdmin/'+matricule_validateur,data).pipe();
  }
  deletMvmPers(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'MvmPersonne/deleteMvmPers',body).pipe();
  }
// changement element salaire

  SaveMvmEchencier(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'MvmEcheancier/SaveMvmEchencier/',body);
  }

  getMvmByMatricule(matricule): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'MvmEcheancier/allMvmByMat/'+matricule).pipe();
  }

  deleteMvmEcheancier(data:any): Observable<any> {
    const body=JSON.parse(JSON.stringify(data));
    return this.http.post(SERVER_URL_BE+ 'MvmEcheancier/deletMatricule/',body).pipe();
  }

  getAllMvmEcheanciers(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'MvmEcheancier/allMvmEcheancier');
  }
  SaveDonneeEcheanciers(data:any,matricule_validateur): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.patch(SERVER_URL_BE+'MvmEcheancier/SaveDonneeEcheancier/'+matricule_validateur,body).pipe();
  }

  getEtabByCdService(cdSErvice:any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'MvmEcheancier/allEtabService/'+cdSErvice).pipe();
  }


  deletMvmEche(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'MvmEcheancier/deleteMvmEch',body).pipe();
  }
                              //recrtemenet

  getByCIN(cin): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TdonneAdmin/getByCin/'+cin).pipe();
  }

  getAllPositions(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TdonneAdmin/allPosition/').pipe();
  }
  getAllrefResidence(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refResidence/all').pipe();
  }
  //perso provisoir
  savePersoProv(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'PersProvisoir/save',body).pipe();
  }
  SaveRecrutement(data:any): Observable<any> {
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'TdonneAdmin/SaveRecrutement/',body);
  }

  // update t_personnel provisoire validation = 1
  updateRecrutement(data:any){
    return  this.http.put(SERVER_URL_BE+'PersProvisoir/updateRecrutement',data).pipe();
  }

  getPersProvisoir(matricule: any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'PersProvisoir/unPersProvisoir/' + matricule).pipe();
  }
  getOneEtabBy(cdSErvice): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refService/un/'+cdSErvice).pipe();
  }


  exportEtat(cdService:any): Observable<any>{
    return  this.http.get(SERVER_URL_BE+'EtatExcel/excel/'+cdService,{responseType:"arraybuffer"as 'json'});
  }

  exportALLEtats(): Observable<any>{
    return  this.http.get(SERVER_URL_BE+'EtatExcel/excelALL',{responseType:"arraybuffer"as 'json'});
  }









  getDateMvmValider(): Observable<any>  {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/allDateValider');
  }

  //ping
  ping():Observable<any>{
    return this.http.get(SERVER_URL_BEPing , {observe: 'response'});
  }
  // recherche matricule changement de compte
  get(matricule: any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDPADMIN/unPers/' + matricule).pipe();
  }
  getAdmin(matricule: any): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDPADMIN/unPersAdmin/' + matricule).pipe();
  }

  // recherche posiiton changement de posiiton
  getAllPosition(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'SaveMvm/allPosition/').pipe();
  }
  getAllTraces(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TraceMvm/allMvmTrace/').pipe();
  }
  // => les codes Mdr par bqnaue
  getAllMdr(cdBanque:any): Observable<any>{
    return  this.http.get(SERVER_URL_BE2+'/t_ref_cd_banques/'+cdBanque+'/cdMdr').pipe();
  }
  getBanque(cdBanque:any): Observable<any>{
    return  this.http.get(SERVER_URL_BE2+'/t_ref_cd_banques/'+cdBanque).pipe();
  }
  getOneMdr(cdMdr: string): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDMdr/one/' + cdMdr).pipe();
  }

  // => code banque
  getAllBanque(): Observable<any>{
    return  this.http.get(SERVER_URL_BE2+'/t_ref_cd_banques?size=150').pipe();
  }
  getOneBanque(cdMdr: string): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDMdr/one/' + cdMdr).pipe();
  }

  // => CRUD Mouvent
  saveMVT(data:any): Observable<any>{
    const headers = new HttpHeaders()
      .append(
        'Content-Type',
        'application/json'
      );
    const body=JSON.parse(JSON.stringify(data));

    return  this.http.post(SERVER_URL_BE+'SaveMvm/save/',body,{headers}).pipe();
  }
  getAllMVT(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'SaveMvm/allMvm').pipe();
  }

  saveMvm(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'SaveMvm/save',body).pipe();
  }

  saveMvmR(data:any,matricule:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.put(SERVER_URL_BE+'SaveMvm/updateR/'+matricule,body).pipe();
  }

  // Mise a jour de MVT vers AdminPersonelle
  UpdateMtoA(data:any,matricule:any){
    const body=JSON.parse(JSON.stringify(data));
    // console.log(data);
    return  this.http.put(SERVER_URL_BE+'TDPADMIN/updatePersM/'+matricule,body).pipe();
  }




  //EcheancierCRUD
  getAllMvmEcheancier(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/allEcheancier');
  }
  getServiceAvalider(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/ServiceAvalidation');
  }

  saveEcheanciers(data:any): Observable<any>{
    //console.log(data);
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'Echeancier/save/',body);
  }

  getAllTypeEcheancier(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TypeEcheancier/all');
  }
  getOneTypeEcheancier(type: string): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TypeEcheancier/unePartie/' + type).pipe();
  }

  getAllByMatriculeEcheancier(matricule): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'donneeEcheancier/allByQuery/'+matricule);
  }
  getCdPostMontant(matricule): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'donneeEcheancier/allCdPostMontant/'+matricule);
  }
  getAllrefService(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refService/all').pipe();
  }
  getAllCdServices(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refService/allCdServices').pipe();
  }
  getAllrefMinistere(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refMinistere/all').pipe();
  }

  getOneResBy(cdResidence): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refResidence/un/'+cdResidence).pipe();
  }
  getEtabBy(cdSErvice): Observable<any> {
    console.log(cdSErvice)
    return this.http.get(SERVER_URL_BE+ 'Echeancier/allEtab/'+cdSErvice).pipe();
  }


  getMvmByMatCdService(param): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/allMvm/'+param).pipe();
  }
  getMvmMatriculeCodePoste(param): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/mvmMatriculeCdPost'+param).pipe();
  }

  getEchMatCdp(param): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'donneeEcheancier/getEchMatCdp/'+param).pipe();
  }
  updateEcheancier(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.patch(SERVER_URL_BE+'donneeEcheancier/updateEcheancier',body).pipe();
  }
  updeateMvmduplicateImport(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.patch(SERVER_URL_BE+'Echeancier/updeateDuplicate',body).pipe();
  }
  saveListEChs(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'donneeEcheancier/saveListEChs',body).pipe();
  }



  getMvmByMat(matricule): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'Echeancier/allMvmByMat/'+matricule).pipe();
  }

  deleteById(id:any): Observable<any> {
    return this.http.delete(SERVER_URL_BE+ 'Echeancier/delete/'+id).pipe();
  }

  saveDonneeEch(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'donneeEcheancier/save',body).pipe();
  }
  saveDonneeEch2(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'donneeEcheancier/saveEcheancier',body).pipe();
  }

  SaveDonneeEcheancier(data:any,datas): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'donneeEcheancier/SaveDonneeEcheancier/'+datas,body).pipe();
  }

  SaveAllMvmImport(data:any): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.post(SERVER_URL_BE+'Echeancier/SaveAllMvmImport',body).pipe();
  }

  deleteByMatPoste(data:any): Observable<any> {
    return this.http.delete(SERVER_URL_BE+ 'donneeEcheancier/delete/'+data).pipe();
  }
  UpdateM(data:any){
    return  this.http.put(SERVER_URL_BE+'Echeancier/updateEch',data).pipe();
  }


  //recrtemenet




  //update mvm rectificatif
  updateMvmPosition(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.patch(SERVER_URL_BE+'SaveMvm/updatePosition',body).pipe();
  }
  updateMvmCompte(data): Observable<any>{
    const body=JSON.parse(JSON.stringify(data));
    return  this.http.patch(SERVER_URL_BE+'SaveMvm/updateCompte',body).pipe();
  }

  rejeter(matricule): Observable<any>{
    return  this.http.patch(SERVER_URL_BE+'SaveMvm/rejeter/',matricule).pipe();
  }
  valider(datas): Observable<any>{
    return  this.http.patch(SERVER_URL_BE+'SaveMvm/valider/',datas).pipe();
  }

  saveDansEcheancier(data): Observable<any>{
    return  this.http.patch(SERVER_URL_BE+'TDPADMIN/updateMvmToAdmin',data).pipe();
  }

  //recru
  getAllProvisoir(): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'PersProvisoir/allMvmPro').pipe();
  }

  getPersByService(cdService): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDPADMIN/getService/'+cdService).pipe();
  }
  getCdServiceMinistere(cd_ministere): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'refService/getCdServiceMinistere/'+cd_ministere).pipe();
  }
  getServiceCdMnt(cdService): Observable<any> {
    return this.http.get(SERVER_URL_BE+ 'TDPADMIN/getServiceCdMnt/'+cdService).pipe();
  }

  updatePassword(data): Observable<any> {
    return this.http.patch(SERVER_URL_BE3+ 'AppUsers/updateUser',data);

  }
}
