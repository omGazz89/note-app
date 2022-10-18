import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NoteState, NoteStateModel } from 'src/app/data/note-store/note.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(NoteState.status)
  status$: Observable<NoteStateModel> | undefined;
  status: "create" | "edit" | "init" | undefined;  // questo dovrebbe diventare un type enum

  constructor() { }

  // TODO aggiungere un enum per gli status per eviatre di avere in giro magic string

  get showCreate(): boolean{
    return this.status === "create" 
  }

  get showEdit(): boolean{
    return this.status === "edit" 
  }

  get init(): boolean{
    return this.status === "init" 
  }

  ngOnInit(): void {
    this.status$?.subscribe(res => {
      this.status = res.status
    })
  }

  ngOnDestroy(){
    // Unsubscription da fare qua, lascio commentato eprchè non ho wrappato gli osservabili in subscription
    // e cmq ci sono molti modi diversi di gestire l'unsubscription
    //this.status$?.unsubscribe()
  }
}
