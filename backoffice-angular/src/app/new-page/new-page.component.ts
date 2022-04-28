import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  constructor(private apiService: ApiServiceService) { }

  newDocumentsList!: any

  ngOnInit(): void {
    this.apiService.getDocuments(false).subscribe(data => {
      console.log(data);
      this.newDocumentsList = data;
      console.log(this.newDocumentsList);
  }, err => {
    console.log(err)
  }
  );
  }

}
