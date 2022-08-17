import { LocationOn, MyLocationRounded, PlusOneRounded } from "@mui/icons-material";
import React from "react";
import TopHotels from "./TopHotels";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function Home() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <main>
      <div className="mainContainer">
        <div className="bannerContainer">
          <img
            src={require("../../../images/Banner.jpg")}
            className="banner"
            alt=""
          />
          <div className="bannerSlogan">
            <h1 className="mainSlogan">FEEDISH</h1>
            <h5 className="subSlogan">Delivering happiness</h5>
          </div>
          <div className="searchLocation">
            <MyLocationRounded className="locationIcon" />
            <Button
              className="minimal"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Location
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
             <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <MyLocationRounded fontSize="small" />
          </ListItemIcon>
          <ListItemText>Detect current location</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LocationOn fontSize="small" />
          </ListItemIcon>
          <ListItemText>Malappuram</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LocationOn fontSize="small" />
          </ListItemIcon>
          <ListItemText>Makkaraparamba</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
            </Menu>
            <input type="text" placeholder="Search items" />
          </div>
        </div>
      </div>
      <TopHotels />
    </main>
  );
}

export default Home;
