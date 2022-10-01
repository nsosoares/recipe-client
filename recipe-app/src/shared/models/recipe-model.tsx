import { Note } from "./notes-model";

export class Recipe {
    constructor(
        public id: number,
        public numberOfDishes: number,
        public preparationTime: number,
        public ingredients: number,
        public preparationInstructions: number,
        public notes: Note[] = [],
    ) {}

    public addNote(note: Note) : void {
        this.notes.push(note);
    }
}