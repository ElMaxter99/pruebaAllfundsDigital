import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit, OnDestroy {
  suscription!: Subscription;
  newDocumentsList!: any;

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.getDocuments();

    // Optimizar la subscripcion
    console.log('Abriendo observable...');
    
    this.suscription = this.apiService.refresh$.subscribe(() => {
      this.getDocuments();
    });
    
  }
  // Evitamos fugas de memoria
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log('Observable Cerrado');
  }

  async getDocuments() {
    await this.apiService.getDocuments(false).subscribe(
      (data) => {
        this.newDocumentsList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //documentar
  onSubmit(f: NgForm) {
    this.addDocument(f.value);
    f.reset();

  }

  // documentar
  async addDocument(f: any) {
    await this.apiService.createDocument(f).subscribe(
      (data) => {
        // por devolver algo
        console.log(data)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  
}
