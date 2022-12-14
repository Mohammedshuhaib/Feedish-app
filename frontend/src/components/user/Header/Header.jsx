import React, { useState } from "react";
import { ShoppingCartRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import Login from "../Login/Login";
import Signup from "../Signup/SignupModal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [changeModal, setChangeModal] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      setUserLogin(true);
    }
  }, []);

  const setChangeFalse = () => {
    setChangeModal(false);
    setShowLoginModal(true);
  };

  const setChangeTrue = () => {
    setChangeModal(true);
    setShowModal(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    setUserLogin(false);
  };

  let handleClose = () => setShowModal(false);
  let handleCloseLogin = () => setShowLoginModal(false);

  return (
    <header>
      <div className="firstPart">
        <img
          src="data:image/png;base64,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"
          alt=""
          className="logo"
        />
      </div>
      <div className="lastPart">
      <div className="restaurantButton">
          <Button color="error">Add restaurant</Button>
        </div>
        <div className="shoppingCart">
          <ShoppingCartRounded className="cart" />
          <div className="cart_content">
            <p>2</p>
          </div>
        </div>

        {userLogin === false && (
          <div className="loginButton">
            <Button
              onClick={() => {
                setShowLoginModal(true);
                setChangeModal(false);
              }}
              variant="outlined"
            >
              Login
            </Button>
          </div>
        )}
        {userLogin === false && (
          <div className="signupButton">
            <Button
              onClick={() => {
                setShowModal(true);
                setChangeModal(true);
              }}
              variant="contained"
              color="success"
            >
              Signup
            </Button>
          </div>
        )}
        {userLogin && (
          <div className="profileContainer">
            <div className="imgbox">
              <img
                className="profilePic"
                onClick={handleClick}
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Profile"
              />
            </div>
            <h2 className="userName">Mohammed shuhaib</h2>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleCloseDropdown}
              onClick={handleCloseDropdown}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}

        <div
          className="profileContainerSmall"
          onClick={() => (userLogin ? handleClick() : setShowLoginModal(true))}
        >
          <div className="imgbox">
            <img
              className="profilePic"
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
            />
          </div>
          <h2 className="userName">Mohammed shuhaib</h2>
        </div>
      </div>
      {changeModal
        ? showModal && (
            <Signup onAction={setChangeFalse} onChange={handleClose} />
          )
        : showLoginModal && (
            <Login onAction={setChangeTrue} onChange={handleCloseLogin} />
          )}
    </header>
  );
}

export default Header;
