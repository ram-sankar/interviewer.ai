import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "../asset/logo.png"


import { Link  } from 'react-router-dom';

const pages = ['Home', 'Generate Questions'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} style={{ 
            display: 'flex', 
            marginRight: '10px',
            width: '2.5%', // Adjust width as needed
            height: '2.5%', // Maintain aspect ratio
          }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AiRecruit
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
               
                    {page}
                   
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                Home
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="/generate-questions" style={{ color: 'white', textDecoration: 'none' }}>
                  Create Test
                </Link>
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
          </Link>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
 
//  export const Navbar = () => {
//     const [isOpen, setOpen] = useState(false);
//     return (
//       <nav
//         className="navbar is-primary"
//         role="navigation"
//         aria-label="main navigation"
//       >
//         <div className="container">
//           <div className="navbar-brand">
//             <a
//               role="button"
//               className={`navbar-burger burger ${isOpen && "is-active"}`}
//               aria-label="menu"
//               aria-expanded="false"
//               onClick={() => setOpen(!isOpen)}
//             >
//               <span aria-hidden="true"></span>
//               <span aria-hidden="true"></span>
//               <span aria-hidden="true"></span>
//             </a>
//           </div>
  
//           <div className={`navbar-menu ${isOpen && "is-active"}`}>
//             <div className="navbar-start">
//               <NavLink className="navbar-item" to="/">
//                 Home
//               </NavLink>
  
//               <NavLink
//                 className="navbar-item"
//                 to="/generate-questions"
//               >
//                 Generate Questions
//               </NavLink>
  
//               <NavLink
//                 className="navbar-item"
//                 to="/home"
//               >
//                 Home
//               </NavLink>
//             </div>
  
//             <div className="navbar-end">
//               <div className="navbar-item">
//                 <div className="buttons">
//                   <a className="button is-white">Log in</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     );
//   };