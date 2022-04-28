import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {
  // podria ponerlo en envoriment tb 
  private endPoint: string = "/v1/documents";

  private url = environment.API_URI+this.endPoint;

  socket!: Socket



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
    return this.http.get(this.url, {params})

    
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
   * Socket
   */
  /**
   * 
   * @param event -> Selecciona a que "escucha" estará subscrita
   * newDocEvent -> documentos nuevos
   * archiveDocEvent -> Documentos archivados
   */
  connectSocket(pageName: string) {
    this.socket = io(environment.SOCKET_ENDPOINT)
    this.socket.emit('joinPage', {pageName: pageName});
  }

  sendDocUpdate(pageName: string) {
    console.log("sendDocUpdate")
    this.socket = io(environment.SOCKET_ENDPOINT)
    this.socket.emit(pageName);
  }

  recieveDocUpdate() {
    return new Observable((observer) => {
      this.socket.on('test', (test) => {
        console.log(test);
        console.log("recieveDocUpdate")
        observer.next()
      })
    
    });
  }

}
