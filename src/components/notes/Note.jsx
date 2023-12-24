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
    margin: 8px;
    box-shadow: none;
`

const Options = styled(CardActions)`
    cursor: pointer;
`

const Note = ({ note, width }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [updateNote, setUpdateNote] = useState({...note})
    const { notes, setNotes, setSearchNotes } = useContext(DataContext);


    const updateNoteFunction = () => {
        const items = notes.filter(item => item.id !== note.id)
        setNotes([updateNote, ...items])
        setSearchNotes([updateNote, ...items])
        setIsMouseOver(false)
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


    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        
        // setDeleteNotes(prevArr => [note, ...prevArr]);
        const reply = prompt('This will delete the note forever!!')
        // console.log(typeof(reply))
        if (typeof(reply) === 'string') {
            setNotes(updatedNotes)
            setSearchNotes(updatedNotes)
        };
    }

    const onTextChange = (e) => {
        let changedNote = { ...updateNote, [e.target.name]: e.target.value };
        console.log(e.target.name, e.target.value)
        setUpdateNote(changedNote);
    }

    const handleMouseOut = () => {
        if (isEditing) return
        setIsMouseOver(false)
        // setTimeout(() => {
            
        // }, [3000])
    }

    return (
            <StyledCard className='card-item'  style={{backgroundColor: updateNote.color}}
            onMouseOver={() => setIsMouseOver(true)}
            onMouseOut={handleMouseOut}
            >
                    <CardContent className='note_fields'>
                        {!isEditing ? <>
                                <Typography onMouseOver={() => setIsMouseOver(true)} style={{fontSize: '1.2rem', fontWeight: '500', marginBottom: '10px'}}>{note.heading}</Typography>
                                <Typography onMouseOver={() => setIsMouseOver(true)}>{note.text}</Typography>
                            </> : <>
                                <TextField 
                                    value={updateNote.heading}
                                    variant="standard"
                                    InputProps={{ disableUnderline: false }}
                                    style={{ marginBottom: 10 }}
                                    onChange={(e) => onTextChange(e)}
                                    name='heading'
                                    onMouseOver={() => setIsMouseOver(true)}
                                />
                                <TextField 
                                    value={updateNote.text}
                                    variant="standard"
                                    InputProps={{ disableUnderline: false }}
                                    onChange={(e) => onTextChange(e)}
                                    name='text'
                                    onMouseOver={() => setIsMouseOver(true)}
                                />
                            </>
                        }
                    </CardContent> 
                    <Options onMouseUp={() => setIsMouseOver(true)}>
                        { isMouseOver ?
                            <>
                            { !isEditing ?
                        
                        <Edit 
                            fontSize='medium'
                            style={{ marginLeft: 'auto' }}
                            onClick={() => editNote(note)}
                            onMouseEnter={() => setIsMouseOver(true)}
                        /> : 
                        <>
                            <label style={{marginLeft: '10px'}}
                            onMouseEnter={() => setIsMouseOver(true)}>
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
                                onMouseEnter={() => setIsMouseOver(true)}
                            />
                        </>
                        
                    }
                    <Archive 
                            fontSize="medium"  
                            onMouseEnter={() => setIsMouseOver(true)}
                        />
                        <Delete 
                            fontSize="medium"
                            onClick={() => deleteNote(note)}
                            onMouseEnter={() => setIsMouseOver(true)}
                        />
                            </> : <div style={{height: '23px'}}></div>
                        }
                        
                        
                    </Options>
            </StyledCard>
    )
}

export default Note;