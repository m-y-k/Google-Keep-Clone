import { useContext } from 'react';
import '../notes/note.css'

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import {  UndoRounded as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

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
`;

const Archive = ({ archive }) => {

    const { notes, archiveNotes, setNotes, setAcrchiveNotes, setDeleteNotes, setSearchNotes } = useContext(DataContext);

    const unArchiveNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setAcrchiveNotes(updatedNotes);
        setNotes(prevArr => [archive, ...prevArr]);
        //
        setSearchNotes(notes);
    }

    const deleteNote = (archive) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== archive.id);
        setAcrchiveNotes(updatedNotes);
        setDeleteNotes(prevArr => [archive, ...prevArr]);
    }

    return (
        <StyledCard className='card-item' style={{backgroundColor: archive.color}}>
                <CardContent>
                    <Typography>{archive.heading}</Typography>
                    <Typography>{archive.text}</Typography>
                </CardContent>
                <Options>
                    <Unarchive 
                        fontSize="medium" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => unArchiveNote(archive)}
                    />
                    <Delete 
                        fontSize="medium"
                        onClick={() => deleteNote(archive)}
                    />
                </Options>
        </StyledCard>
    )
}

export default Archive;