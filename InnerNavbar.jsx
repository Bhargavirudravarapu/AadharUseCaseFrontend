/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Images/LogoImg.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { CreateNewFolderRounded, DeleteForeverRounded, DeleteOutline, UpdateDisabledOutlined, UpdateOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";



const InnerNavbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
 
  const menuOptions = [
    {
      text: "Create",
      icon: <CreateNewFolderRounded />,
      path: "/CreationPage",
    },
    {
      text: "Update",
      icon: <UpdateOutlined />,
    },
   
    {
      text: "Delete",
      icon: <DeleteOutline />,
    },
    {
        text: "Home",
        icon: <HomeIcon />,
        path: "/Home",
        
      }
  ];
  return (
    <nav>
        <div className="Logo">
        <h1>E-ID Seva</h1>
       
        </div>
       <div className="nav-logo-container"> 
     
        {/* <img src={Logo} alt="" /> */}
      </div>
      <div className="navbar-links-container">
        

            <Link to="/Home">
              Home
            </Link>


        <Link to="/CreationPage">
              Create
            </Link>

            <Link to="/UpdatePage">
              Update
            </Link>

      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                <Link to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
          </Link>
                </ListItemButton>
              </ListItem>
              
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default InnerNavbar;