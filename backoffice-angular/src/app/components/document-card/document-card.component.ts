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

  ngOnInit(): void {
    /*
    this.documento = {
      title: 'Titulo rexulon',
      description: 'Lorem imsun asdasdasd',
      date: new Date(),
      content:
        "ypeext of text of the printing and typeext of the printing and typeext of the printing and typeext of the printing and typeext of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has s",
      author: 'El Maxter',
    };
    */
  }

  archivarDocumento() {
    this.apiService.archivarDocument(this.documento._id!).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  eliminarDocumento() {
    this.apiService.deleteDocument(this.documento._id!).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
