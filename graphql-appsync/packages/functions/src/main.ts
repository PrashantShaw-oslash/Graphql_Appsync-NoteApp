import createNote from "./lambda/createNote";
import { deleteNote } from "./lambda/deleteNode";
import { getNoteById } from "./lambda/getNoteById";
import { listNotes } from "./lambda/listNotes";
import { updateNote } from "./lambda/updateNote";
import Note from "./types/Note";

type AppSyncEvent = {
    info: {
        fieldName: string,
    }
    arguments: {
        note: Note
        noteId: string
    }
}

export async function handler(
    event: AppSyncEvent
): Promise<Record<string, unknown>[] | Note | string | undefined | null> {
    switch(event.info.fieldName) {
        case "createNote": {
            return await createNote(event.arguments.note);
        }
        case "listNotes": {
            return await listNotes()
        }
        case "getNoteById": {
            return await getNoteById(event.arguments.noteId)
        }
        case "updateNote": {
            return await updateNote(event.arguments.note)
        }
        case "deleteNote": {
            return await deleteNote(event.arguments.noteId)
        }
        default: {
            return null;
        }
    }
}

