import { Note } from "src/app/domain/note/note.entity";

export class AddNote {
    static readonly type = '[Note] Add Note';
    constructor(public note: Note) {}
}

export class RemoveNote {
    static readonly type = '[Note] Remove Note';
    constructor(public note: Note) {}
}

export class SelectNote {
    static readonly type = '[Note] Select Note';
    constructor(public note: Note) {}
}

export class ChangeStatus {
    static readonly type = '[Note] Change Status';
    constructor(public status: "create" | "edit" | "init" | undefined) {}
}

export class AddTitle {
    static readonly type = '[Note] Add Title';
    constructor(public title: string) {}
}

export class AddDescription {
    static readonly type = '[Note] Add Description';
    constructor(public description: string) {}
}