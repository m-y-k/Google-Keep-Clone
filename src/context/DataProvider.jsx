import { createContext, useEffect, useState } from 'react';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [archiveNotes, setAcrchiveNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);
    const [searchNotes, setSearchNotes] = useState([]);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes'));
        const storedArchivedNotes = JSON.parse(localStorage.getItem('archived'));
        const storedTrashNotes = JSON.parse(localStorage.getItem('deleted'));
        const storedSearchNotes = JSON.parse(localStorage.getItem('notes'));
        if (storedNotes) {
          setNotes(storedNotes);
          setAcrchiveNotes(storedArchivedNotes);
          setDeleteNotes(storedTrashNotes);
          setSearchNotes(storedSearchNotes)
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('archived', JSON.stringify(archiveNotes));
        localStorage.setItem('deleted', JSON.stringify(deleteNotes));
        localStorage.setItem('searched', JSON.stringify(searchNotes));
      }, [notes, archiveNotes, deleteNotes, searchNotes]);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setAcrchiveNotes,
            deleteNotes,
            setDeleteNotes,
            searchNotes,
            setSearchNotes
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;