/* Sono cosciente che questa suite di test sia lontana dall'essere completa, per esempio non ho testato
il behaviour vero e proprio del componente ma solo il metodo add note... il tempo è quello che è :( */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NoteService } from 'src/app/application/services/note.service';
import { NoteState } from 'src/app/data/note-store/note.state';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let noteServiceSpy: jasmine.SpyObj<NoteService>;


  beforeEach(async () => {
    noteServiceSpy = jasmine.createSpyObj("noteService", ["addNote"]);
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        NgxsModule.forRoot([NoteState])],
      providers:[
        { provide: NoteService, useValue: noteServiceSpy }
      ]
       
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("addNote", () => {
    fit("should showError if note.title is empty", () => {
      spyOn((component as any), "showError")
      spyOn((component as any), "clearCurrentNote")
      component.note.title = ""
      component.addNote();
      
      expect((component as any).showError).toHaveBeenCalled()
      expect(noteServiceSpy.addNote).not.toHaveBeenCalled()
      expect((component as any).clearCurrentNote).not.toHaveBeenCalled()

    })

    fit("should call noteService.addNote and clearCurrentNote if note.title is NOT empty", () => {
      spyOn((component as any), "clearCurrentNote")
      
      component.note.title = "Foobar"
      component.addNote();
      
      expect(noteServiceSpy.addNote).toHaveBeenCalled()
      expect((component as any).clearCurrentNote).toHaveBeenCalled()
    })
  })
});
