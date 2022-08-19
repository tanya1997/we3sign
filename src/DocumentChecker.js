import React, {useCallback, useMemo, useState} from 'react';
import { Typography, Box, TextField,  Button, Card, CardContent} from '@mui/material';
import {useDropzone} from 'react-dropzone'
import { contractAddress, abi } from "./config";
import { useWeb3React } from "@web3-react/core";
import DocInfo from './DocInfo';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  
  const Web3 = require("web3");

function DocumentChecker() {
    const [switchMode, setSwitchMode] = useState(true);

    const [signedFiles, setSignedFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({onDrop});
     // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

      const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
      } = useWeb3React();

      const [bidValue, setBidValue] = useState("");
    
    async function onChange(e) {
        const web3 = new Web3(Web3.givenProvider);
      // const accounts = await web3.eth.getAccounts();
      //Contract.setProvider(Web3.givenProvider);
      var contract = new web3.eth.Contract(abi, contractAddress);
      //console.log(inputPrice.current.value)
      

      /* contract.methods.get().call({from:account}, function(err,data){
          console.log(data)
      });*/

      contract.methods.getDocumentByKey(String(bidValue), String("")).call({from:account}, function(err,data){
          console.log(data);
          setSignedFiles(data);
          setSwitchMode(false)
        });
    } 

    function addBidValue(e) {
      console.log(e.target.value)
      setBidValue(e.target.value)
    }


    return (
      <div>
      {
        switchMode ? (
        <Card  style={{margin: "80px auto", maxWidth: '700px', height: '400px'}} >
            <CardContent>
            <TextField fullWidth={true} id="outlined-basic" label="Paste uniqe code (if you have)" variant="outlined" />
            <TextField fullWidth={true} id="outlined-basic" label="IPFS link to file" variant="outlined" value={bidValue} onChange={addBidValue} />
            <Typography  fullWidth={true} variant="h5">or select files here</Typography>
            
            <div className="container">
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </div>
            <Button variant="contained" fullWidth={true} onClick={onChange}>Check</Button>
            </CardContent>

        </Card>) :(
          <DocInfo cards={signedFiles}/>
        )
      }</div>

    );
}

export default DocumentChecker;