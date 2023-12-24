import { useState, useRef, useContext } from 'react';
import './form.css'
import { ColorLensOutlined as Color, CheckBoxOutlined as CheckBox, BrushOutlined as Brush, 
    ImageOutlined as Image, AddAlertOutlined as Alert, PersonAddAltOutlined as Person,
     MoreVertOutlined as More, ArchiveOutlined as Archive, PushPinOutlined as Pin } from '@mui/icons-material';
import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';

import { DataContext } from '../../context/DataProvider';
import { useMediaQuery } from 'react-responsive';

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
    const isMobile900 = useMediaQuery({ query: `(max-width: 900px)` });
    const { notes, setNotes, setSearchNotes } = useContext(DataContext);
    
    const containerRef = useRef();

    const handleClickAway = () => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        setAddNote({ ...note, id: uuid() });

        if (addNote.heading || addNote.text) {
            setNotes(prevArr => [addNote, ...prevArr])
            setSearchNotes(prevArr => [addNote, ...prevArr])
        }
    }
    
    const closeForm = () => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
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
            <Container ref={containerRef} style={{minWidth: '300px', marginBottom: '50px', marginTop: '20px'}}>
                {   showTextField && 
                    <div className='title_field'>
                        <TextField 
                            placeholder="Title"
                            variant="standard"
                            InputProps={{ disableUnderline: true }}
                            style={{ marginBottom: 10 }}
                            onChange={(e) => onTextChange(e)}
                            name='heading'
                            value={addNote.heading}
                        />
                        <Pin style={{color: '#757575'}} />
                    </div>
                }
                <div className='textfield_raw'>
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
                    {!showTextField &&
                        <div className='textfield_icons'>
                            <CheckBox />
                            <Brush />
                            <Image />
                        </div>
                    }
                    
                </div>
                {   showTextField && 
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Box className='color_choose'>
                                {!isMobile900 && <Alert style={{fontSize: '1rem'}}/>}
                                <Person style={{fontSize: '1rem'}}/>                              
                                <Image style={{fontSize: '1rem'}}/>
                                {!isMobile900 && <><Archive style={{fontSize: '1rem'}}/>
                                    <More style={{fontSize: '1rem'}}/></>
                                }                               
                                <label className='color_div'>
                                    <Color style={{fontSize: '1rem'}}/>
                                    <input
                                        type="color"
                                        value={'blue'}
                                        name='color'
                                        onChange={(e) => onTextChange(e)}
                                        style={{ visibility:'hidden', border: '0', borderRadius: '100%', backgroundColor: 'transparent', width: '25px' }}
                                    />
                                </label>
                        </Box>
                        <div className='close_btn'
                            onClick={() => closeForm()}
                        >Close</div>
                    </div>
                }
            </Container>
        </ClickAwayListener>
    )
}

export default Form;