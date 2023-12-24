import './index.css'
import Note from "../notes/Note";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Grid } from '@mui/material';

const GridView = () => {
    const { notes, searchNotes } = useContext(DataContext);
    console.log(notes)

    return (
        <div className="card-top">
            {
                            searchNotes.map(note => (
                                <div key={note.id} className='card-box'>
                                    <Note note={note}/>
                                </div>
                            ))
                        }
          </div>
    )
}

export default GridView