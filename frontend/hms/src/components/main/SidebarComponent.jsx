import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography } from '@mui/material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SidebarComponent = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const menuItems = [
    {
      category: 'Patient',
      items: ['Patient List', 'Add Patient', 'Patient Records'],
    },
    {
      category: 'Doctor',
      items: ['Doctor List', 'Add Doctor', 'Doctor Schedule'],
    },
    {
      category: 'Appointment',
      items: ['Schedule Appointment', 'View Appointments'],
    },
    {
      category: 'Laboratory',
      items: ['Lab Tests', 'Add Lab Test', 'Lab Results'],
    },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#3f51b5', // Set background color
          color: '#fff', // Set text color
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ borderColor: '#fff' }} />
      <List>
        {menuItems.map((menu) => (
          <Accordion key={menu.category} sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
              aria-controls={`${menu.category}-content`}
              id={`${menu.category}-header`}
            >
              <Typography>{menu.category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {menu.items.map((text) => (
                  <ListItem button key={text}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                      {text.includes('Patient') ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarComponent;
