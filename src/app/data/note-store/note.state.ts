import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

/* Ho utilizzato ngxs come state manager, scelta personale. Lo trovo pulito e leggero */

import { Note } from 'src/app/domain/note/note.entity';
import * as NoteAction from "src/app/data/note-store/note.actions";


export class NoteStateModel {
    notes : Note[] = [] as Note[];
    selectedNote : Note = {} as Note;
    status: "create" | "edit" | "init" | undefined = undefined
  }

@State<NoteStateModel>({
  name: 'notes',
  defaults: { 
    notes: [] as Note[],
    selectedNote: {} as Note,
    status: "init" 
 } 
})
@Injectable()
export class NoteState {
    @Selector()
    static notes(state: Note[]) {
      return state;
    }

    @Selector()
    static status(status: "create" | "edit" | "init" | undefined) {
      return status;
    }

    @Action(NoteAction.AddNote)
    addNote(ctx: StateContext<NoteStateModel>, action: NoteAction.AddNote): void {
        ctx.setState(
            patch<NoteStateModel>({
            notes: append<Note>([action.note])
        }));
    }

    @Action(NoteAction.RemoveNote)
    removeNote(ctx: StateContext<NoteStateModel>, action: NoteAction.RemoveNote): void {
        ctx.setState(
            patch<NoteStateModel>({
            notes: removeItem<Note>(note => note?.title === action.note.title)
        }));
    }

    @Action(NoteAction.ChangeStatus)
    changeStatus(ctx: StateContext<NoteStateModel>, action: NoteAction.ChangeStatus): void {
        ctx.patchState({
            status: action.status
    });
  }

    @Action(NoteAction.SelectNote)
    selectNote(ctx: StateContext<NoteStateModel>, action: NoteAction.SelectNote): void {
        ctx.patchState({
          selectedNote: action.note
    });
  }
}