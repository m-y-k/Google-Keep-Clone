import { createContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [notes, setNotes] = useState([]);
    const [searchNotes, setSearchNotes] = useState([]);
    const [isGrid, setIsGrid] = useState(true);
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes'));
        const storedSearchNotes = JSON.parse(localStorage.getItem('notes'));
        if (storedNotes) {
          setNotes(storedNotes);
          setSearchNotes(storedSearchNotes)
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
        localStorage.setItem('searched', JSON.stringify(searchNotes));
        
      }, [notes, searchNotes]);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            searchNotes,
            setSearchNotes,
            isGrid,
            setIsGrid, 
            isMobile
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;