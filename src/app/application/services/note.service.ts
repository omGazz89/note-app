/*Ho creato un service in questo caso NON perchè fosse necessario ma semplicemente perchè in questo modo
se si volesse cambiare lo store manager bisognerebbe injectarlo nel costruttore di questo service e usare il
suo dispatch dentro al metodo addNote. L'obbiettivo in questo caso è stato disaccaoppiare il più possibile i componenti
dalle logiche*/

import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AddNote } from "src/app/data/note-store/note.actions";
import { Note } from "src/app/domain/note/note.entity";

@Injectable({ providedIn: "root" })
export class NoteService
{
  constructor(private store: Store) { }

  public addNote(note: Note): void {
    this.store.dispatch(new AddNote(note))
  }
}