import { useState, useRef, useContext } from 'react';
import './form.css'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';

import { DataContext } from '../../context/DataProvider';
import { Visibility } from '@mui/icons-material';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 55%;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

const note = {
    id: '',
    heading: '',
    text: ''
}

const Form = () => {

    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...note, id: uuid() });

    const { setNotes } = useContext(DataContext);
    
    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        setAddNote({ ...note, id: uuid() });

        if (addNote.heading || addNote.text) {
            setNotes(prevArr => [addNote, ...prevArr])
        }
    }
    
    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value };
        setAddNote(changedNote);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef} style={{marginBottom: '50px', marginTop: '20px'}}>
                {   showTextField && 
                    <TextField 
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='heading'
                        value={addNote.heading}
                    />
                }
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={(e) => onTextChange(e)}
                    name='text'
                    value={addNote.text}
                />
                {   showTextField && 
                    <Box className='color_choose'>
                        <label>
                            <ColorLensOutlinedIcon/>
                            <input
                                type="color"
                                value={'blue'}
                                name='color'
                                onChange={(e) => onTextChange(e)}
                                style={{ visibility:'hidden', border: '0', borderRadius: '100%', backgroundColor: 'transparent', width: '25px' }}
                            />
                        </label>
                        
                    </Box>
                }
            </Container>
        </ClickAwayListener>
    )
}

export default Form;