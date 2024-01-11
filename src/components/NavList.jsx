

import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CreateOutlined as EditLabels, NotificationsNoneOutlined as Reminders, LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import './navList.css'

const NavList = () => {

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb /> },
        { id: 2, name: 'Reminders', icon: <Reminders /> },
        { id: 3, name: 'Edit labels', icon: <EditLabels /> },
        { id: 4, name: 'Archives', icon: <Archive /> },
        { id: 5, name: 'Trash', icon: <Delete /> },
    ]
    
    return (
        <div className='navlist'>
        {
            navList.map(list => (
                // <ListItem button >
                    <div className='list-item' key={list.id}>
                        <ListItemIcon className='list-icon'>
                            {list.icon}
                        </ListItemIcon>
                        <ListItemText className='list-item-text' primary={list.name}/> 
                    </div>
                // </ListItem>
            ))
        }
        </div>
    )
}

export default NavList;