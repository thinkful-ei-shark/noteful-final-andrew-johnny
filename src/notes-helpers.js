
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes, noteId) =>{
  // console.log('notes in finder', notes)
  // console.log('note id in finder', noteId)
 const note = notes.find(note => parseInt(note.id) === parseInt(noteId))
//  console.log('note found in finder', note) 
 return note
}
export const getNotesForFolder = (notes=[], folderId) =>{
  if(!folderId){
    return notes
  }
  else return notes.filter(note=>note.folder_id == folderId)
} 

export const countNotesForFolder = (notes=[], folder_id) =>
  notes.filter(note => note.folder_id === folder_id).length
