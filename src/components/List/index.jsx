import './index.css'
import Note from "../notes/Note";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const ListView = () => {
    
    const { notes, searchNotes } = useContext(DataContext);
console.log(notes)
  return (
    <div className='list-container'
    >
      {searchNotes.map((value) => {
        return (
          <div className='list-item-lists'
            key={value.id}
          >
            <Note note={value} />
          </div>
        );
      })}
    </div>
  );
};

export default ListView;