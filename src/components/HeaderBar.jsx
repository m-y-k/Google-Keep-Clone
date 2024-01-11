
import { AppBar, Toolbar, Typography, IconButton, TextField, Box } from '@mui/material';
import { Menu, SearchOutlined as Search, RefreshOutlined as Refresh, 
  GridViewOutlined as Grid, SettingsOutlined as Settings, 
  AppsOutlined as Apps, ViewAgendaOutlined as List } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import './headerBar.css'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import { useMediaQuery } from 'react-responsive';

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
  const dp = 'https://www.newsshare.in/wp-content/uploads/2/Neon-Mask-WhatsApp-DP-8-180x180.jpg'
  const [searchTerm, setSearchTerm] = useState('')
  const { notes, setSearchNotes, isGrid, setIsGrid, isMobile } = useContext(DataContext)

  useEffect(() => {
    if (isMobile) handleDrawer()
    else handleDrawer()
  }, [isMobile])

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
          className='menu-btn'
          edge="start"
        >
          <Menu />
        </IconButton>
        <img src={logo} alt="logo" className='keep-logo' />
        <Heading className='hide_till_600 keep-heading'>Keep</Heading>
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
        <div className='icons_header'>
          <div className="icons">
            <Refresh className='hide_till_800 hover'/>
            {
              isGrid ? <List className=' hover' onClick={() => {setIsGrid(false)}}/> : <Grid className=' hover' onClick={() => {setIsGrid(true)}}/>
            }   
            <Settings className='hide_till_800 hover'/>
          </div>
          <div className="profile">
            <Apps className='hide_till_800 hover'/>
            <img src={dp} alt="DP" style={{width: 31, borderRadius: '50%'}} />
          </div>
        </div>
      </Toolbar>
    </Header>
  )
}

export default HeaderBar;