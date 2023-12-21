import { useContext, useState } from 'react';
import './note.css'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { Card, CardContent, CardActions, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckOutlined as Save, ModeEditOutlined as Edit, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Options = styled(CardActions)`
    cursor: pointer;
`

const Note = ({ note }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [updateNote, setUpdateNote] = useState({...note})
    const { notes, setNotes, setAcrchiveNotes, setDeleteNotes, setSearchNotes } = useContext(DataContext);


    const updateNoteFunction = () => {
        const items = notes.filter(item => item.id !== note.id)
        setNotes([updateNote, ...items])
    }

    const editNote = () => {
        console.log('edit clicked')
        setIsEditing(true)
    }

    const saveNote = () => {
        console.log('edit clicked')
        setIsEditing(false)
        updateNoteFunction()
    }

    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
        //
        setSearchNotes(notes)
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
        // 
        setSearchNotes(notes)
    }

    const onTextChange = (e) => {
        let changedNote = { ...updateNote, [e.target.name]: e.target.value };
        console.log(e.target.name, e.target.value)
        setUpdateNote(changedNote);
    }

    return (
            <StyledCard className='card-item'  style={{backgroundColor: updateNote.color}}>
                    <CardContent className='note_fields'>
                        {!isEditing ? <>
                                <Typography style={{fontSize: '1.2rem', fontWeight: '500', marginBottom: '10px'}}>{note.heading}</Typography>
                                <Typography>{note.text}</Typography>
                            </> : <>
                                <TextField 
                                    value={updateNote.heading}
                                    variant="standard"
                                    InputProps={{ disableUnderline: false }}
                                    style={{ marginBottom: 10 }}
                                    onChange={(e) => onTextChange(e)}
                                    name='heading'
                                />
                                <TextField 
                                    value={updateNote.text}
                                    variant="standard"
                                    InputProps={{ disableUnderline: false }}
                                    onChange={(e) => onTextChange(e)}
                                    name='text'
                                />
                            </>
                        }
                    </CardContent> 
                    <Options>
                        { !isEditing ?
                        
                            <Edit 
                                fontSize='medium'
                                style={{ marginLeft: 'auto' }}
                                onClick={() => editNote(note)}
                            /> : 
                            <>
                                <label style={{marginLeft: '10px'}}>
                                        <ColorLensOutlinedIcon/>
                                        <input
                                            type="color"
                                            value={'blue'}
                                            name='color'
                                            onChange={(e) => onTextChange(e)}
                                            style={{visibility:'hidden', border: '0', borderRadius: '100%', backgroundColor: 'transparent', width: '25px', }}
                                        />
                                </label>
                                <Save
                                    fontSize='medium'
                                    style={{ marginLeft: 'auto' }}
                                    onClick={() => saveNote(note)}
                                />
                            </>
                            
                        }
                        <Archive 
                            fontSize="medium"  
                            onClick={() => archiveNote(note)}
                        />
                        <Delete 
                            fontSize="medium"
                            onClick={() => deleteNote(note)}
                        />
                    </Options>
            </StyledCard>
    )
}

export default Note;