import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { DocumentModel } from '../shared/models/DocumentModel';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  private URI: string = "http://localhost:8000"
  private endPoint: string = "/v1/documents";
  private url = this.URI+this.endPoint;

  private _refresh$ = new Subject<void> ();




  constructor(private http: HttpClient) { }

  
  //Tipar bien
  
  /**
   * 
   *  CRUD
   * 
   */

  /**
   * He hecho el método para devolver documentos new o archived SOLAMENTE
   * @param archivedDocument 
   * @returns 
   */
  getDocuments(archivedDocument: Boolean): Observable<any>{
    
    let params = new HttpParams().set('filtro', String(archivedDocument));
    return this.http.get(this.url, {params}).pipe(
      tap(()=> {
        this._refresh$.next();
      })
      )

    
  }
  // Voy a ponerlo any para no perder tiempo del form al model
  createDocument(doc: any): Observable<any>{
    return this.http.post(this.url, doc);
  }

  deleteDocument(id: String): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  archivarDocument(id: String): Observable<any>{
    return this.http.patch(`${this.url}/${id}`, {});
  }



  /**
   * EXTRA
   */

  get refresh$() {
    return this._refresh$;
  }


}
