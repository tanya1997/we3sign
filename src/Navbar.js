import React, {useCallback} from "react";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useWeb3React } from "@web3-react/core";
import ModalWallet from "./ModalWallet";

function Navbar() {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/doc_upload', {replace: true}), [navigate]);
    const handleOnClick2 = useCallback(() => navigate('/', {replace: true}), [navigate]);

    const {
      library,
      chainId,
      account,
      activate,
      deactivate,
      active
    } = useWeb3React();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleOnClick2} >Check document</Button>
          <Button color="inherit" onClick={handleOnClick} >Sign document</Button>
          {
         
         !active ? (
            <Button style={{float: "right", marginLeft: 'auto', display: "flex", alignItems: "center"}} color="inherit">Login</Button>
          ) : ( 
            <div style={{float: "right", marginLeft: 'auto', display: "flex", alignItems: "center"}}>
              <Typography>{account}</Typography>
              <Button color="inherit" onClick={deactivate}>Logout</Button>
            </div>
            
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;