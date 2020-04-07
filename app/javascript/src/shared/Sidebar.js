import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './Style.css'
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: "5%",
    left: "0"
  },
  appBar: {
    top: '50px',
    width: "5%",
    left: "0",
    backgroundColor: 'white',
    display: 'flex',
    boxShadow: 'none',
    zIndex: '0',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    color: 'darkGrey',
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    height: '84vh',
    top: '52px',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const staticPages = [
      {
        displayName: "Archives",
        link: "archives"
      },
      {
        displayName: "By Laws",
        link: "bylaws"
      },
      {
        displayName: "Charitable Gift Fund",
        link: "charitablegiftfund"
      },
      {
        displayName: "Customs & Traditions",
        link: "customstraditions"
      },
      {
        displayName: "Family Agreements Policy",
        link: "familyagreements"
      },
      {
        displayName: "Forms",
        link: "forms"
      },
      {
        displayName: "History",
        link: "history"
      },
      {
        displayName: "Membership",
        link: "membership"
      },
      {
        displayName: "Planned Giving",
        link: "plannedgiving"
      }
    ];

    return (
      <div className="sidebar">
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                  <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                  </IconButton>
                </div>
                <Divider />
                <List>
                {['articles', 'cabins', 'events', 'pictures', 'users'].map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemText><Link to={`/${text}`}>{text}</Link></ListItemText>
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                  {staticPages.map((text, index) => (
                    <ListItem button key={index}>
                      <ListItemText><Link to={`/${text.link}`}>{text.displayName}</Link></ListItemText>
                    </ListItem>
                  ))}
                </List>
            </Drawer>
        </div>
      </div>
    )
}

export default Sidebar;
