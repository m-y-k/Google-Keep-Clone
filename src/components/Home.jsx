
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';

const Home = () => {
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <Router>
                <SwipeDrawer />      
                <Notes />
            </Router>
        </Box>
    )
}

export default Home;