import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { MoralisProvider } from "react-moralis";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <MoralisProvider appId="LVPSvKczr0dc8endeBOobATuN8Z65ND0KP2jxWDo" serverUrl="https://ph04nxxxflg1.usemoralis.com:2053/server">
      <Web3ReactProvider getLibrary={getLibrary}>
        <App style={{ backgroundImage: `url(/4853433.jpg)` }}/>
      </Web3ReactProvider>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
