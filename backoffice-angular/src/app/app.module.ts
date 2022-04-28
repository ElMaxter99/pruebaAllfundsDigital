import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPageComponent } from './new-page/new-page.component';
import { ArchivedPageComponent } from './archived-page/archived-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DocumentCardComponent } from './components/document-card/document-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPageComponent,
    ArchivedPageComponent,
    HeaderComponent,
    FooterComponent,
    DocumentCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
