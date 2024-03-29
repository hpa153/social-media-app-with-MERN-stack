import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { gapi } from 'gapi-script';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    const token = user?.token;

    if(token.length >= 500) {
      window.gapi.load('auth2', () => {
        window.gapi.auth2
          .init({
            client_id: "616851694573-p4h40u6jkak3rk04qjo91pcle1ums0ov.apps.googleusercontent.com",
          })
          .then(() => {
            window.gapi.auth2
              .getAuthInstance()
              .signOut()
              .then(function() {
                console.log('User signed out.');
              });
          });
      });
    }

    dispatch({ type: LOGOUT })
    setUser(null);
    navigate("/");
  };
  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">Stories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
              <Button
                className={classes.logout}
                variant="contained"
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;