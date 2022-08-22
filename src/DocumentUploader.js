import React, {useCallback, useState, useRef, useMemo} from 'react';
import { Typography, Box, TextField,  Button, Card, CardContent} from '@mui/material';
import { useWeb3React } from "@web3-react/core";
import { contractAddress, abi } from "./config";
import DocuSelecter from './DocuSelecter';
import ModalWallet from "./ModalWallet"
import DocInfo from './DocUploadInfo';
import './Selector.css';


 const Web3 = require("web3");
//var Contract = require("xdc3-eth-contract");
  
function DocumentChecker() {
  const [secretCode, setSecretCode] = useState("");
  const [signedFiles, setSignedFiles] = useState("");
  const [switchMode, setSwitchMode] = useState(true);
  const childRef = useRef(null);
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React();
      async function onChange(e) {
        const bidResult = await childRef.current.calculateBid();
        if (bidResult == 0){

        }
        
        console.log(bidResult[0]);
       
         const web3 = new Web3(library.provider);
         var contract = new web3.eth.Contract(abi, contractAddress);

         console.log("br " + bidResult)

        contract.methods.addDocument(bidResult, new Date().toISOString(), secretCode, account, childRef.current.getNFTImage()).send(
          {
            from: account,
            gas: 800000,
          },
          (error, transactionHash) => {
            setSignedFiles(bidResult);
            setSwitchMode(false);
            console.log(error);
            console.log(transactionHash);
          }
        );
      }

      const changeSecretCode = (event) => {
        setSecretCode(event.target.value)
      };

    return (
      <div>
         { switchMode ? (
          <div>
         {
         
          !active ? (
              <ModalWallet modalOpenState={true}></ModalWallet>
            ) : (
              <Card  style={{margin: "80px auto", maxWidth: '700px', height: 'auto'}} >
              

              <div className="main" >
                <Typography variant="h5" component="h3" noWrap className='inner' align='center' fullWidth={true} >
                  File Signature
                </Typography>
              </div>
              <CardContent>
                <TextField fullWidth={true} style={{ margin: "10px auto" }} value={secretCode} onChange={changeSecretCode} id="outlined-basic" label="Paste unique code (if you want)" variant="outlined" />
                <DocuSelecter ref={childRef} maxFiles={5} height={'auto'}/>
                <Button variant="contained" style={{ margin: "10px auto" }} fullWidth={true} onClick={onChange}>Sign</Button>
              </CardContent>

          </Card>
            )
        }
        </div>
        ): (<DocInfo cards={signedFiles} setSwitchMode={setSwitchMode}/>)
      }
      </div>

    );
}

export default DocumentChecker;