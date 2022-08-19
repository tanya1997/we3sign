import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import './AnimatedButton1.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,

  largeIcon: {
    width: 60,
    height: 60,
  },

};

/*
           
*/

function ModalWallet(props) {
    const { activate } = useWeb3React();
    const [open, setOpen] = useState(props.modalOpenState);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
      };
/*<Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >*/
    return (
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
        <Box sx={{ ...style, width: 400 }}>
          <div className='animated-button'>
            <Button  variant="outlined" fullWidth={true} sx={{ height: 140, fontSize: 24, color: '#1c2539' }} onClick={() => {
                activate(connectors.sequenceWallet);
                setProvider("sequenceWallet");
              }}>
                <Box 
                  
                  mr={2}
                  component="img"
                  src="/sequence-logo.svg"
                  alt="Metamask Logo"
                  width={45}
                  height={50}
                  borderRadius="3px"
                />
                Sequence Wallet</Button>
            </div>

            <Grid container rowSpacing={1} pt={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth={true}  sx={{ height: 60 }} onClick={() => {
                  activate(connectors.injected);
                  setProvider("injected");
                }}>
                  <Box
                    mr={2}
                    component="img"
                    src="/mm.png"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  Metamask Wallet</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth={true}  sx={{ height: 60 }} onClick={() => {
                  activate(connectors.coinbaseWallet);
                  setProvider("coinbaseWallet");
                }}>
                  <Box
                    mr={2}
                    component="img"
                    src="/cbw.png"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  Coinbase Wallet</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth={true}  sx={{ height: 60 }} onClick={() => {
                  activate(connectors.walletConnect);
                  setProvider("walletConnect");
                }}>
                  <Box
                    mr={2}
                    component="img"
                    src="/wc.png"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  Wallet Connect</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth={true}  sx={{ height: 60 }} onClick={() => {
                  activate(connectors.coin98Wallet);
                  setProvider("coin98Wallet");
                }}>
                  <Box
                    mr={2}
                    component="img"
                    src="/coin98-logo.svg"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  Coin98 Wallet</Button>
              </Grid>
            </Grid>
        </Box>
      </Box>
    );
}
// <Button onClick={handleClose}>Close Child Modal</Button>
export default ModalWallet;