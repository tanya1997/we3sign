import React, {useCallback, useState, useMemo} from 'react';
import { Typography, Box, TextField,  Button, Card, CardContent} from '@mui/material';
import {useDropzone} from 'react-dropzone'
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import SwitchSelector from "react-switch-selector";
import { contractAddress, abi } from "./config";
import ModalWallet from "./ModalWallet"
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

  const options = [
    {
      label: "Link",
      value: true,
      selectedBackgroundColor: "#0097e6",
      innerHeight: 50
    },
    {
      label: "Upload",
      value: false,
      selectedBackgroundColor: "#fbc531"
    }
  ];

 const Web3 = require("web3");
//var Contract = require("xdc3-eth-contract");
  
function DocumentChecker() {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React();
  const [switchMode, setSwitchMode] = useState(true);
  const [bidValue, setBidValue] = useState("");
    const onDrop = useCallback(acceptedFiles => {
      console.log(acceptedFiles)
        // Do something with the files
      }, [])
    const {
        getRootProps,
        acceptedFiles,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({maxSize: 5242880, maxFiles: 1, onDrop});
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
  
      const onChangeFileMode = newValue => {
        console.log(newValue);
        setSwitchMode(newValue)
      };
      async function onChange(e) {
         const web3 = new Web3(library.provider);
         var contract = new web3.eth.Contract(abi, contractAddress);

        contract.methods.addDocument(String(bidValue), String(""), account, "path").send(
          {
            from: account,
            gas: 800000,
          },
          (error, transactionHash) => {
            console.log(error);
            console.log(transactionHash);
          }
        );
      }

      function addBidValue(e) {
        //console.log(e.target.value)
        setBidValue(e.target.value)
      }

      const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    return (
      <div>
         {
         
         !active ? (
            <ModalWallet modalOpenState={true}></ModalWallet>
          ) : (
            <Card  style={{margin: "80px auto", maxWidth: '700px', height: '400px'}} >
            <CardContent>

            <div className="App" style={{ backgroundColor: "#fbc531",  height: "40px"}} >
              <Typography variant="h5" component="h3" noWrap color="#FFFFFF" align='center' style={{ color: "#FFFFFF" }} fullWidth={true} >
                File Signature
              </Typography>
            </div>

            <TextField fullWidth={true} style={{ margin: "10px auto" }} id="outlined-basic" label="Paste unique code (if you want)" variant="outlined" />
            <div style={{ height: "210px"}} >
              <div style={{ height: "40px"}} >
                <SwitchSelector
                  style={{ margin: "10px auto", height: "40px" }}
                  onChange={onChangeFileMode}
                  options={options}
                  initialSelectedIndex={switchMode}
                  backgroundColor={"#353b48"}
                  fontColor={"#f5f6fa"}
                />
              </div>
              { switchMode ? (
                <TextField fullWidth={true} style={{ margin: "60px auto" }} value={bidValue} onChange={addBidValue} id="outlined-basic" label="IPFS link to file" variant="outlined" /> ) :(
                
                  <div>
                    <div className="container" style={{ margin: "10px auto" }}>
                        <div {...getRootProps({style})}>
                            <input {...getInputProps()} />
                            <p style={{ textAlign: "center" }}>Drag 'n' drop file here, or click to select file.<br/>Max size is 5mb</p>
                        </div>
                    </div>
                    { (acceptedFiles.length > 0) ? (
                      <aside>
                        <ul>{files}</ul>
                      </aside>
                    ):(<div></div>)

                    }
                  </div>
                )
              }
            </div>
            <Button variant="contained" style={{ margin: "10px auto" }} fullWidth={true} onClick={onChange}>Sign</Button>
            </CardContent>

        </Card>
          )}
      </div>

    );
}

export default DocumentChecker;