import React, {useCallback, useState, useMemo, useEffect, useImperativeHandle, forwardRef, useRef} from 'react';
import {TextField, Grid, Box, CardContent, Card, Checkbox, FormControlLabel } from '@mui/material';
import {useDropzone} from 'react-dropzone'
import SwitchSelector from "react-switch-selector";
import { Web3Storage } from 'web3.storage'
import { useMoralisWeb3Api } from 'react-moralis';
import { useWeb3React } from "@web3-react/core";
import './RadioImage.css';

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

  const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJENmM1MGFjYzY3ZkYyMmJiODlmOTkyNkJCOUE4YzgxOWE2RmY1NDMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEwMDY0NDkxNjMsIm5hbWUiOiJXRTNTSUdOIn0.ngZVAGY5q7lFhhLEkMW9lSy8k4nAI1aUKTuqXUhD9Iw" })
  const Hash = require('ipfs-only-hash')


function DocuSelecter(props, ref) {

      const [switchMode, setSwitchMode] = useState(true);
      const [bidValue, setBidValue] = useState("");
      const [fileValue, setFileValue] = useState([]);
      const [fileImages, setImageValues] = useState([]);
      const [NFTsign, setNFTsign] = useState(false);
      const [NFTimage, setNFTImage] = useState("");
      const Web3Api = useMoralisWeb3Api()

      const {
        active,
        account
      } = useWeb3React();

      useImperativeHandle(ref, () => ({
        async calculateHash(){
          const bids = [];
            if (switchMode){
              console.log(bidValue)
              bids.push(bidValue)
            }else{
              if (fileValue.length > 0){
                //let contentBuffer = await readFileAsync(fileValue[0]);

                const rootCid = await client.put(fileValue)
                    console.log(rootCid)
                    //const url = `https://4everland.io/ipfs/${rootCid}`
                    //console.log(url)

                    const res = await client.get(rootCid)
                    console.log(`Got a response! [${res.status}] ${res.statusText}`)
                    if (!res.ok) {
                      throw new Error(`failed to get ${rootCid} - [${res.status}] ${res.statusText}`)
                    }
                  
                    // unpack File objects from the response
                    const files = await res.files()
                    for (const file of files) {
                      console.log("fs11 " + file.cid)
                      bids.push(file.cid)
                      console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
                    }
                //const hash = await Hash.of(contentBuffer)
                //console.log(hash)
                //bids.push(hash)
              }
            }
          return bids;  
        },
        getNFTImage(){
          return NFTimage;

        },
        async calculateBid() {

            const bids = [];
            if (switchMode){
              console.log(bidValue)
              bids.push(bidValue)
            }else{
                if (fileValue.length > 0){
                    console.log(fileValue)
                    //let contentBuffer = await readFileAsync(fileValue);
                    //console.log(contentBuffer)
                    
                    const rootCid = await client.put(fileValue)
                    console.log(rootCid)
                    //const url = `https://4everland.io/ipfs/${rootCid}`
                    //console.log(url)

                    const res = await client.get(rootCid)
                    console.log(`Got a response! [${res.status}] ${res.statusText}`)
                    if (!res.ok) {
                      throw new Error(`failed to get ${rootCid} - [${res.status}] ${res.statusText}`)
                    }
                  
                    // unpack File objects from the response
                    const files = await res.files()
                    for (const file of files) {
                      console.log("fs " + file.cid)
                      bids.push(file.cid)
                      console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
                    }

                }


            }
            
            console.log('child function 1 called: ' + bids);
            return bids;
        }
      }));

        function readFileAsync(file) {
          return new Promise((resolve, reject) => {
            let reader = new FileReader();
        
            reader.onload = () => {
              resolve(reader.result);
            };
        
            reader.onerror = reject;
        
            reader.readAsText(file);
          })
        }
      
      
      
        const onDrop = useCallback(acceptedFiles => {
          console.log(acceptedFiles)
          if (acceptedFiles.length > 0)
            setFileValue(acceptedFiles)
            // Do something with the files
          }, [])
        const {
            getRootProps,
            acceptedFiles,
            getInputProps,
            isFocused,
            isDragAccept,
            isDragReject
          } = useDropzone({maxSize: 5242880, maxFiles: props.maxFiles, onDrop});

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


          useEffect(() => {
              const images = [];
              const getNFT= async () => {
                const result = await Web3Api.account.getNFTs({
                  chain: "mumbai",
                  address: account
                });
                console.log(result)
                  const res = result.result;
                  console.log("result: " + JSON.stringify(res))
                  if (res !== undefined){
                      res.forEach(element => {
                        console.log("el: " + element)
                        if (element.metadata !== undefined){
                          console.log("el22: " + element.metadata)
                          const metadata = JSON.parse(element.metadata);
                          console.log("metadata: " + metadata)
                         if (metadata != null && metadata.image != undefined && metadata.image.length > 0){
                            console.log("mm: " )
                            const im = metadata.image.replace('ipfs://', 'https://w3s.link/');
                            console.log("image link" + im)
                            images.push(im)
                        }

                        }


                      });
                      setImageValues(images)

                  }
              };
              
              if (active){
                getNFT();
              }
          }, [setImageValues]);

      function addBidValue(e) {
        setBidValue(e.target.value)
      }

      const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

      const nftSignChange = (event) => {
        setNFTsign(event.target.checked)
      };

      function onSignChanged(e) {
        console.log("change: " + e.target.value)
        setNFTImage(e.target.value)
      }

    return (
        <div style={{ height: props.height}} >
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
              <div style={{ height: 230 }}>
              { switchMode ? (
                <TextField fullWidth={true} style={{ margin: "60px auto" }} value={bidValue} onChange={addBidValue} id="outlined-basic" label="IPFS Hash" variant="outlined" /> ) :(
                
                  <div>
                    <div className="container" style={{ margin: "10px auto" }}>
                        <div {...getRootProps({style})}>
                            <input {...getInputProps()} />
                            <p style={{ textAlign: "center" }}>Drag 'n' drop file here, or click to select file. <br/> Max files: {props.maxFiles}. Max size is 5mb</p>
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
            { (props.maxFiles > 1) ? (
            <div>
               <FormControlLabel
                control={ <Checkbox checked={NFTsign} onChange={nftSignChange}></Checkbox>}
                label="Sign via NFT"
                />
                {NFTsign ? (
                    <Grid item>
                    <label style={{ margin: "5px" }} >
                        <input type="radio" name="test" value={""} defaultChecked={true} onClick={onSignChanged}/>
                        <img src="/none.jpg" alt="Option 1" width={100} height={100}/>
                    </label> 
                    {fileImages.map((image, index) => {
                      console.log("up")
                      return (
                            <label key={index} style={{ margin: "5px" }}>
                              <input type="radio" name="test" value={image} onClick={onSignChanged} />
                              <img src={image} alt="Option 1" width={100} height={100}/>
                            </label>                    
                    );
                  })}
                  </Grid>) : (<div></div>)
                }
          </div>) :(<div></div>)
}
        </div>
    );
}

export default forwardRef(DocuSelecter);