'use strict'
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AppService {

 private apiUrl = '/api';//'http://192.168.252.14:8080';//
  // private apiUrl = 'http://192.168.252.14:8080';

  constructor(private http: Http) { }

  getStat(datePtk){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/getStat/'+datePtk, options)
      .map(this.extractData)
      .catch(this.handleError)
  }


  getObl() {
    return this.http.get(this.apiUrl + '/obl')
      .map(this.extractData)
      .catch(this.handleError)
  }

  getRaion(idObl) {
    return this.http.get(this.apiUrl + '/raion/' + idObl)
      .map(this.extractData)
      .catch(this.handleError)
  }
  getUserList(idObl, idRaion) {
    return this.http.get(this.apiUrl + '/users/' + idObl + '/' + idRaion)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getDatePtk() {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/dateTest', options)
      .map(this.extractData)
      .catch(this.handleError)
  }


  getListApel(dataPtk) {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/contApels/' + dataPtk, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getListApelAdmin(dataPtk) {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/getApels/' + dataPtk, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getSubjectList() {
    return this.http.get(this.apiUrl + '/subjects')
      .map(this.extractData)
      .catch(this.handleError)
  }

  getLangList() {
    return this.http.get(this.apiUrl + '/lang')
      .map(this.extractData)
      .catch(this.handleError)
  }
  getClientList() {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/clients', options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getApelInfo(idApel){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/printApels/'+idApel, options)
      .map(this.extractData)
      .catch(this.handleError)
  }
  
  getSingleApelInfo(idApel){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/printApelForm/'+idApel, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getOperatorApel(){    
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/getClientContApels', options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getQuestionApelResult(){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/questionApelResult', options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getDetailPackageApel(id){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/contApel/'+id, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  printNCT(id, clientId){
   
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/printApelPackage/'+id+'/'+clientId, options)
      .map(this.extractData)
      .catch(this.handleError)
  }











  repApel(idApel){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });    
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/repApel/'+idApel,  options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  sendApels(idApelPackage){
     let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });    
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/sendApels/'+idApelPackage,  options)
      .map(this.extractData)
      .catch(this.handleError)
  }


  authService(login, pass) {
    sessionStorage.setItem('code', btoa(login + ':' + pass));
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + btoa(login + ':' + pass)
    });
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.post(this.apiUrl + '/login', null, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  getClientSubjects(idClient) {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code')
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/clientSubjects/' + idClient, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  setClientSubject(idClient, lang, typeTestId, subject, fio, infoActive) {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('clientId', idClient);
    urlSearchParams.append('langId', lang);
    urlSearchParams.append('typeTestId', typeTestId);
    urlSearchParams.append('subjectId', subject);
    urlSearchParams.append('teacherName', fio);
    urlSearchParams.append('isEnabled', infoActive);
    let body = urlSearchParams.toString();
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.post(this.apiUrl + '/addClientSubject', body, options)
      .map(this.extractData)
      .catch(this.handleError)
  }


  updateClientSubject(idUser, fio, infoActive) {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', idUser);
    urlSearchParams.append('teacherName', fio);
    urlSearchParams.append('isEnabled', infoActive);
    let body = urlSearchParams.toString();
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.post(this.apiUrl + '/updateClientSubject', body, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  removeClientsubject(idUser) {
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', idUser);
    let body = urlSearchParams.toString();
    let options = new RequestOptions({ headers: myHeaders });

    return this.http.post(this.apiUrl + '/clientSubject', body, options)
      .map(this.extractData)
      .catch(this.handleError)
  }


  updateContApel(id,idResult,desc){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('resultId', idResult);
    urlSearchParams.append('resulDescr', desc);
    let body = urlSearchParams.toString();
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.post(this.apiUrl + '/updateContApel', body, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  sendApelPackage(apelPackageId){
    let myHeaders = new Headers({
      'Authorization': 'Basic ' + sessionStorage.getItem('code'),
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.apiUrl + '/sendApelPackage/'+apelPackageId, options)
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) {
    return res;
  }

  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }
    

    return Observable.throw(message);
  }


  // private handleError(error: Response | any) {

  //   return Observable.throw(error || error);
  // }

}
