/*Ho preferito creare 2 componenti differenti per il form di insert e il form di edit per tenere le logiche il più separato possibile. 
Possono sembrare molto simili e non sarebbe un errore fare un singolo componente, ho personalmente preferito
applicare il SRP (single responsability principle) ad ogni classe dell'applicativo*/

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { date } from 'src/app/application/extensions/date.extension';
import { AddNote, ChangeStatus, RemoveNote } from 'src/app/data/note-store/note.actions';
import { NoteState, NoteStateModel } from 'src/app/data/note-store/note.state';
import { Note } from 'src/app/domain/note/note.entity';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  error = {
    isVisible: false,
    message: "Title can't be empty"
  }

  constructor(private store: Store) { }

  @Select(NoteState.notes)
  selectedNote$: Observable<NoteStateModel> | undefined;
  selectedNote: Note | undefined;

  public delete(): void {
    if(this.selectedNote) {
      this.selectedNote.update = date.today();
      this.store.dispatch(new RemoveNote(this.selectedNote))
      this.store.dispatch(new ChangeStatus("init"))
    }

  }

  public save(): void {
    if(this.selectedNote){
      if(this.selectedNote.title){
        this.selectedNote.update = date.today();
        this.store.dispatch(new RemoveNote(this.selectedNote))
        this.store.dispatch(new AddNote({...this.selectedNote}))
        this.store.dispatch(new ChangeStatus("init"))
      }else{
        this.showError()
      }
    }
  }

  //codice duplicato!!! andrebbe gestito a livello globale
  private showError() {
    this.error.isVisible = true;
    setTimeout(() => {
      this.error.isVisible = false;
    }, 2000)
  }

  ngOnInit(): void {
    this.selectedNote$?.subscribe(res => {
      this.selectedNote = res.selectedNote
    })
  }

}
