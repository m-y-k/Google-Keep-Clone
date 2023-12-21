import { useContext } from 'react';
import '../notes/notes.css'

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import DeleteNote from './DeleteNote';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {

    const { deleteNotes } = useContext(DataContext);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container className='card-top'>
                    {
                        deleteNotes.map(deleteNote => (
                            <Grid item key={deleteNote.id}>
                                <DeleteNote deleteNote={deleteNote} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default DeleteNotes;