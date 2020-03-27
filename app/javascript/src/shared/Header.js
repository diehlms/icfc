
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useDispatch } from "react-redux";
import * as actions from '../store/actions/index'
import './Style.css'

class  Header extends React.Component {
  state = {
    search: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    this.props.onSearch(this.state.search)
  }

  onLogout = () => {
    this.props.onLogout()
  }

  render() {
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className="title" variant="h6" noWrap>
              ICFC
            </Typography>
            <Typography variant="p" noWrap>
              <Button onClick={this.onLogout}>Logout</Button>
            </Typography>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                    Camp Info
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem><RouterLink to="/forms">Forms</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/history">History</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/bylaws">By-Laws</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/membership">Membership</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/customstraditions">Customs & Traditions</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/plannedgiving">Planned Giving</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/familyagreements">Family Agreements Policy</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/archives">Archives</RouterLink></MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                    External Links
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem><RouterLink to="www.google.com">Fishing Resources</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="">Snake Guide</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/bylaws">Water Levels</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/membership">Webcam</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/customstraditions">Ice Coverage</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/plannedgiving">Planned Giving</RouterLink></MenuItem>
                    <MenuItem><RouterLink to="/familyagreements">GBLT</RouterLink></MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
              <div>
                  <Button variant="outlined">
                      <RouterLink to="/articles">Articles</RouterLink>
                  </Button>
                  <Button variant="outlined">
                      <RouterLink to="/cabins">Cabins</RouterLink>
                  </Button>
                  <Button variant="outlined">
                      <RouterLink to="/events">Events</RouterLink>
                  </Button>
                  <Button variant="outlined">
                      <RouterLink to="/users">Users</RouterLink>
                  </Button>
                  <Button variant="outlined">
                      <RouterLink to="/pictures">Pictures</RouterLink>
                  </Button>
              </div>
            <div className="search">
              <div className="searchIcon">
                <SearchIcon />
              </div>
              <form onSubmit={this.onSubmit}>
                <InputBase
                  placeholder="Search..."
                  onChange={this.onChange}
                  name="search"
                  target="search"
                  className="inputRoot inputInput"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSearch: (search) => dispatch(actions.search(search)),
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Header)

