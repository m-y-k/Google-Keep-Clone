
import { AppBar, Toolbar, Typography, IconButton, TextField, Box } from '@mui/material';
import { Menu, SearchOutlined as Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import './headerBar.css'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`

const Heading = styled(Typography)`
  color: #5F6368;
  font-size: 24px;
  margin-left: 25px;
`

const Container = styled(Box)`
  
`


const HeaderBar = ({ open, handleDrawer }) => {
  const logo = 'https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png';
  const [searchTerm, setSearchTerm] = useState('')
  const { notes, setSearchNotes } = useContext(DataContext)
  useEffect(() => {
    const searchedNotes = notes.filter((note) => note.heading.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || note.text.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    setSearchNotes(searchedNotes)
    console.log(searchedNotes)
  }, [searchTerm])

  return (
    <Header open={open}>
      <Toolbar className='header_bar'>
        <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: '20px'}}
          edge="start"
        >
          <Menu />
        </IconButton>
        <img src={logo} alt="logo" style={{width: 30}} />
        <Heading>Keep</Heading>
        <Container className='search_bar'>
          <Search style={{color: '#A5A8A7'}} />
          <TextField className='search_field'
            placeholder="Search..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{  color: '#A5A8A7', width: '100%'}}
            onChange={(e) => setSearchTerm(e.target.value)}
            name='search'  
          />
        </Container>
      </Toolbar>
    </Header>
  )
}

export default HeaderBar;