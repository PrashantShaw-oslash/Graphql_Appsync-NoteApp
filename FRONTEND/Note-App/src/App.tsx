// import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { useForm, Controller } from "react-hook-form"
import { Note, NoteInput, useCreateNoteMutation, useDeleteNoteMutation, useListNotesQuery, useUpdateNoteMutation } from "./graphql/codegen/graphql";

export default function App() {
  const formData = {
    defaultValues: { noteData: '' }, 
    rules: { required: true }
}
  const {register, control, handleSubmit, watch, formState: {errors}, setValue, setFocus} = useForm(formData)
  const { noteData } = watch()
  // ----------codegen------------
  const [listNotesResult, refetchNotesList] = useListNotesQuery()
  const { data: notesList, fetching: isFetchingNotes, error: isNotesListError } = listNotesResult
  const [createNoteResult, createNoteMutation] = useCreateNoteMutation()
  const [updateNoteResult, updateNoteMutation] = useUpdateNoteMutation()
  const [deleteNoteResult, deleteNoteMutation] = useDeleteNoteMutation()
  // -----------------------------
  const [list, setList] = useState<Note[]>([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState('')

  useEffect(() =>{
    if (!isFetchingNotes) setList(notesList?.listNotes as Note[])
  }, [isFetchingNotes])
  // ADD NOTE HANDLER
  const addNoteHandler = () => {
    // if (noteData === '') return null
    const id: string = (Math.random() * 10000).toString(34)
    const newEntry: NoteInput = {id, content: noteData}
    setList((rest) => [...rest, newEntry]);
    const variables = { note: newEntry };
    createNoteMutation(variables)
      .then((data) => {})
      .catch((err) => {});
    setValue("noteData", '')
  };
  // DELETE NOTE HANDLER
  const onDeleteHandler = (id: string) => {
    const updatedList = list.filter((d) => d.id !== id);
    setList(updatedList);
    const variables = { noteId: id };
    deleteNoteMutation(variables)
      .then((res) => {})
      .catch((err) => {});
  };

  // ON EDIT HANDLER
  const onEditHandler = ({id, content}: Note) =>{
    setIsEditing(true)
    setEditingNoteId(id)
    setValue("noteData", content)
    setFocus("noteData");
    console.log("from editing")
  }
  // ON SAVE HANDLER
  const onSaveHandler = () =>{
    const updatedList = list.map(note => {
      if (note.id === editingNoteId) {
        return {id: editingNoteId, content: noteData}
      }
      return note
    })
    setList([...updatedList])
    const variables ={ note: {id: editingNoteId, content: noteData}}
    updateNoteMutation(variables).catch(data=>{}).catch(err=>{})
    setIsEditing(false)
    setValue("noteData", '')
    setEditingNoteId('')
  }
  const isNoteContentEmpty = errors['noteData']?.type === 'required' && !isEditing
  console.log(isNoteContentEmpty, errors['noteData']?.type === 'required', !isEditing)
  // RETURN JSX
  if (isFetchingNotes) return <h1>Loading...</h1>;
  if (isNotesListError) return <h2>{isNotesListError.message}</h2>;
  return (
    <div className="App flex flex-col gap-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-6xl text-center mt-8">Notes</h1>
      <div className="flex gap-1 flex-col">
        <div className="flex gap-3 justify-center items-center">
          <Controller
            control={control}
            name='noteData'
            render={({field: {onChange, name, value, ref}})=>{
              return (
              <input
                name={name}
                value={value}
                className={` ${isNoteContentEmpty ? 'focus:ring-red-500 ring-red-600 outline-none' : 'ring-white/10 focus:ring-indigo-500'} max-w-lg min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 placeholder:text-slate-600`}
                onChange={(e) => {
                  onChange(e) // this onChange is from form hook
                }} 
                ref={ref} // to set focus, we need to pass ref
                placeholder="Add Note here" 
                type="text"
              />)
            }}
            rules={{ required: true }}
          />
          { isEditing ?
            <button onClick={handleSubmit(onSaveHandler)} type="submit" className="flex-none rounded-md bg-green-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">Save</button>
          :
            <button onClick={handleSubmit(addNoteHandler)} type="submit" className="flex-none rounded-md bg-indigo-500 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add</button>
          }
        </div>
        {isNoteContentEmpty && 
          <div className="text-sm text-red-500 flex flex-row gap-1 justify-center items-center">
            <MdErrorOutline />
            <p>Note content cant be empty!</p>
          </div>}
      </div>
      <ul className="flex gap-4 justify-center flex-wrap">
        {list?.map((note: Note) => {
          return (
            <li key={note.id} className="bg-gray-800 hover:bg-slate-800 p-2 rounded-lg text-gray-400 w-60 h-40">
              <div className="h-32">
                {note.content}
              </div>
              <div className="flex gap-1 justify-end">
                <FiEdit onClick={() => onEditHandler(note)} className=" text-gray-600 hover:text-yellow-500 cursor-pointer" />
                <RiDeleteBin5Line onClick={() => onDeleteHandler(note.id)} className=" text-gray-600 hover:text-red-400 cursor-pointer"  />
              </div>
            </li>
          );
        })}
      </ul>
      {/* <MyDialog /> */}
    </div>
  );
}
