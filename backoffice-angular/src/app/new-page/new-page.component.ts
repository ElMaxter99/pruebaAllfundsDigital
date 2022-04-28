import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
  newDocumentsList!: any;

  constructor(private router: Router, private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.connectSocket(this.router.url);
    this.recieveDocUpdate();
    this.getDocuments();
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

  //Enviar form 
  onSubmit(f: NgForm) {
    this.addDocument(f.value);
    f.reset();
    this.apiService.sendDocUpdate(this.router.url);
  }

  // hacer peticion crear document
  async addDocument(f: any) {
    await this.apiService.createDocument(f).subscribe(
      (data) => {
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async recieveDocUpdate(){
   await this.apiService.recieveDocUpdate().subscribe((data) => {
    this.getDocuments();

  })

  }

}
