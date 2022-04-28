import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentModel } from '../shared/models/DocumentModel';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  constructor(private http: HttpClient) { }

  private URI: string = "http://localhost:8000"
  private endPoint: string = "/v1/documents";
  private url = this.URI+this.endPoint;

  //Tipar bien
  /**
   * He hecho el método para devolver documentos new o archived SOLAMENTE
   * @param archivedDocument 
   * @returns 
   */
  async getDocuments(archivedDocument: Boolean){
    
    let params = new HttpParams().set('filtro', String(archivedDocument));
    return this.http.get(this.url, {params})
    
  }

  async createDocument(doc: DocumentModel){
    return this.http.post(this.url, doc);
  }

  async deleteDocument(id: String) {
    return this.http.delete(`${this.url}/${id}`);
  }

  async archivarDocument(id: String){
    return this.http.patch(`${this.url}/${id}`, {});
  }


}
