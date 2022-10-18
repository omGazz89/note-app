import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { date } from 'src/app/application/extensions/date.extension';
import { NoteService } from 'src/app/application/services/note.service';
import { ChangeStatus } from 'src/app/data/note-store/note.actions';
import { Note } from 'src/app/domain/note/note.entity';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  note: Note = {
    title: "New Note",
    content: "",
    update: date.today()
  }

  error = {
    isVisible: false,
    message: "Title can't be empty"
  }

  constructor(private noteService: NoteService, private store: Store) { }

  public addNote(): void {
    if(this.note.title){
      const newNote = { ...this.note }
      this.noteService.addNote(newNote);
      //nel caso si volesse disaccoppiare il componente dallos tore usato bisognerebbe
      // wrappare lo store in un service e qui usare il service
      this.store.dispatch(new ChangeStatus("init"))
      this.clearCurrentNote();
    }else {
      this.showError()
    }
  }

  //codice duplicato!!! andrebbe gestito a livello globale
  private showError() {
    this.error.isVisible = true;
    setTimeout(() => {
      this.error.isVisible = false;
    }, 2000)
  }

  private clearCurrentNote(){
    this.note.title = "";
    this.note.content = "";
    this.note.update = date.today();
  }

}
