import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-archived-page',
  templateUrl: './archived-page.component.html',
  styleUrls: ['./archived-page.component.css'],
})
export class ArchivedPageComponent implements OnInit {

  newDocumentsList!: any;

  constructor(private router: Router, private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.connectSocket();
    this.getDocuments();
    this.recieveDocUpdate();

  }

  async getDocuments() {
    await this.apiService.getDocuments(true).subscribe(
      (data) => {
        this.newDocumentsList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }


  recieveDocUpdate() {
    this.apiService.recieveDocUpdate().subscribe((data) => {
      this.getDocuments();
    });
  }
}
