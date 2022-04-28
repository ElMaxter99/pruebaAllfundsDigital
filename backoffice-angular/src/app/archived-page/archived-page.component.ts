import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-archived-page',
  templateUrl: './archived-page.component.html',
  styleUrls: ['./archived-page.component.css']
})
export class ArchivedPageComponent implements OnInit, OnDestroy {
  suscription!: Subscription;

  newDocumentsList!: any

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.getDocuments();
    // Optimizar la subscripcion
    console.log("Abriendo observable...");
    this.suscription = this.apiService.refresh$.subscribe(()=> {
      this.getDocuments();

    });
  }

  // Evitamos fugas de memoria
  ngOnDestroy():void {
    this.suscription.unsubscribe();
    console.log("Observable Cerrado");
  }

  getDocuments(){
    this.apiService.getDocuments(true).subscribe(data => {
      this.newDocumentsList = data;
  }, err => {
    console.log(err)
  }
  );
  }


}
