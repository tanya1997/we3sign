import React, {useCallback, useMemo, useState, useRef} from 'react';
import { Typography, Box, TextField,  Button, Card, CardContent} from '@mui/material';
import {useDropzone} from 'react-dropzone'
import { contractAddress, abi } from "./config";
import { useWeb3React } from "@web3-react/core";
import DocInfo from './DocInfo';
import DocuSelecter from './DocuSelecter';
import './Selector.css';


  
  const Web3 = require("web3");

function DocumentChecker() {
    const [switchMode, setSwitchMode] = useState(true);
    const [secretCode, setSecretCode] = useState("");

    const [bidVal, setbidVal] = useState("");

    const [signedFiles, setSignedFiles] = useState([]);
    const childRef = useRef(null);
  
      const {
        account
      } = useWeb3React();

    
    async function onChange(e) {
      const bidResult = await childRef.current.calculateHash();
      if (bidResult.length == 0){
        console.log("error");
        return;
      }
      setbidVal(bidResult[0]);

      const web3 = new Web3(Web3.givenProvider);
      var contract = new web3.eth.Contract(abi, contractAddress);
      console.log("bidResult " + bidResult[0] + " sc " + secretCode);
      contract.methods.getDocumentByKey(bidResult[0], secretCode).call({from:account}, function(err,data){
          console.log("data " + data + " err " + err);
          setSignedFiles(data);
          setSwitchMode(false)
        });
    } 

    const changeSecretCode = (event) => {
      console.log(event)
      setSecretCode(event.target.value)
    };

    return (
      <div>
      {
        switchMode ? (
        <Card  style={{margin: "80px auto", maxWidth: '700px', height: '480px'}} >
          <div className="main" >
              <Typography variant="h5" className='inner' component="h3" noWrap color="#FFFFFF" align='center' fullWidth={true} >
                Signature Checker
              </Typography>
            </div>
            <CardContent>
            <TextField fullWidth={true} style={{ margin: "10px auto" }} value={secretCode} onChange={changeSecretCode} id="outlined-basic" label="Paste unique code (if you have)" variant="outlined" />
            <DocuSelecter ref={childRef} maxFiles={1} height={260}/>
            <Button variant="contained" fullWidth={true} style={{ margin: "10px auto" }} onClick={onChange}>Check</Button>
            </CardContent>

        </Card>) :(
          <DocInfo cards={signedFiles} setSwitchMode={setSwitchMode} path={bidVal}/>
        )
      }</div>

    );
}

export default DocumentChecker;