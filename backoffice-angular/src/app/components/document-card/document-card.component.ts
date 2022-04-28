import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DocumentModel } from 'src/app/shared/models/DocumentModel';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css'],
})
export class DocumentCardComponent implements OnInit {
  @Input()
  documento: DocumentModel = new DocumentModel();

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {}

  archivarDocumento() {
    this.apiService.archivarDocument(this.documento._id!).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    
  }

  eliminarDocumento() {
    this.apiService.deleteDocument(this.documento._id!).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
