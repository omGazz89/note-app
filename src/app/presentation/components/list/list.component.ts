import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/application/services/note.service';
import { ChangeStatus, SelectNote } from 'src/app/data/note-store/note.actions';
import { NoteState, NoteStateModel } from 'src/app/data/note-store/note.state';
import { Note } from 'src/app/domain/note/note.entity';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  search: string = "";

  constructor(private store: Store) { }

  @Select(NoteState.notes)
  notes$: Observable<NoteStateModel> | undefined;
  notes: Note[] | undefined;

  public addNote(): void {
    this.search = "";
    this.store.dispatch(new ChangeStatus("create"))
   }

  public selectItem(item: Note): void {
    this.store.dispatch(new ChangeStatus("edit"))
    this.store.dispatch(new SelectNote(item))
  }

  public filtering(item: Note): boolean {
    return item.title.includes(this.search)
  }


  ngOnInit(): void {
    this.notes$?.subscribe(res => {
      this.notes = res.notes;
    })
  }
}
