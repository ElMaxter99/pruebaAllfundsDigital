import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentModel } from '../shared/models/DocumentModel';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  private URI: string = "http://localhost:8000"
  private endPoint: string = "/v1/documents";
  private url = this.URI+this.endPoint;

  constructor(private http: HttpClient) { }

  

  //Tipar bien
  /**
   * He hecho el método para devolver documentos new o archived SOLAMENTE
   * @param archivedDocument 
   * @returns 
   */
  getDocuments(archivedDocument: Boolean): Observable<any>{
    
    let params = new HttpParams().set('filtro', String(archivedDocument));
    return this.http.get(this.url, {params})
    
  }

  createDocument(doc: DocumentModel): Observable<any>{
    return this.http.post(this.url, doc);
  }

  deleteDocument(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  archivarDocument(id: String): Observable<any>{
    return this.http.patch(`${this.url}/${id}`, {});
  }


}
