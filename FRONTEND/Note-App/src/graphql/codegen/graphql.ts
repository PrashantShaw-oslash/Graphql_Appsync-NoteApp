import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  deleteNote?: Maybe<Scalars['String']>;
  updateNote?: Maybe<Note>;
};


export type MutationCreateNoteArgs = {
  note?: InputMaybe<NoteInput>;
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['String'];
};


export type MutationUpdateNoteArgs = {
  note?: InputMaybe<UpdateNoteInput>;
};

export type Note = {
  __typename?: 'Note';
  content: Scalars['String'];
  id: Scalars['String'];
};

export type NoteInput = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getNoteById?: Maybe<Note>;
  listNotes?: Maybe<Array<Maybe<Note>>>;
};


export type QueryGetNoteByIdArgs = {
  noteId: Scalars['String'];
};

export type UpdateNoteInput = {
  content: Scalars['String'];
  id: Scalars['String'];
};

export type CreateNoteMutationVariables = Exact<{
  note?: InputMaybe<NoteInput>;
}>;


export type CreateNoteMutation = { __typename?: 'Mutation', createNote?: { __typename?: 'Note', id: string, content: string } | null };

export type ListNotesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListNotesQuery = { __typename?: 'Query', listNotes?: Array<{ __typename?: 'Note', id: string, content: string } | null> | null };

export type UpdateNoteMutationVariables = Exact<{
  note?: InputMaybe<UpdateNoteInput>;
}>;


export type UpdateNoteMutation = { __typename?: 'Mutation', updateNote?: { __typename?: 'Note', id: string, content: string } | null };

export type DeleteNoteMutationVariables = Exact<{
  noteId: Scalars['String'];
}>;


export type DeleteNoteMutation = { __typename?: 'Mutation', deleteNote?: string | null };


export const CreateNoteDocument = gql`
    mutation createNote($note: NoteInput) {
  createNote(note: $note) {
    id
    content
  }
}
    `;

export function useCreateNoteMutation() {
  return Urql.useMutation<CreateNoteMutation, CreateNoteMutationVariables>(CreateNoteDocument);
};
export const ListNotesDocument = gql`
    query listNotes {
  listNotes {
    id
    content
  }
}
    `;

export function useListNotesQuery(options?: Omit<Urql.UseQueryArgs<ListNotesQueryVariables>, 'query'>) {
  return Urql.useQuery<ListNotesQuery, ListNotesQueryVariables>({ query: ListNotesDocument, ...options });
};
export const UpdateNoteDocument = gql`
    mutation updateNote($note: UpdateNoteInput) {
  updateNote(note: $note) {
    id
    content
  }
}
    `;

export function useUpdateNoteMutation() {
  return Urql.useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(UpdateNoteDocument);
};
export const DeleteNoteDocument = gql`
    mutation deleteNote($noteId: String!) {
  deleteNote(noteId: $noteId)
}
    `;

export function useDeleteNoteMutation() {
  return Urql.useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(DeleteNoteDocument);
};