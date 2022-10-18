/* Essendo un applicativo piccolo non ho trovato necessario dividerla in più moduli per sfruttare il lazy loading dei 
componenti in base alle route */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteState } from './data/note-store/note.state';
import { HomeComponent } from './presentation/pages/home/home.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { ListComponent } from './presentation/components/list/list.component';
import { FormComponent } from './presentation/components/form/form.component';
import { FormsModule } from '@angular/forms';
import { FormEditComponent } from './presentation/components/form-edit/form-edit.component';
import { BaseButtonComponent } from './presentation/shared/base-button/base-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ListComponent,
    FormComponent,
    FormEditComponent,
    BaseButtonComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([NoteState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
