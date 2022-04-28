import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-archived-page',
  templateUrl: './archived-page.component.html',
  styleUrls: ['./archived-page.component.css']
})
export class ArchivedPageComponent implements OnInit {

  newDocumentsList!: any

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.apiService.getDocuments(true).subscribe(data => {
      console.log(data);
      this.newDocumentsList = data;
      console.log(this.newDocumentsList);
  }, err => {
    console.log(err)
  }
  );
  }

}
