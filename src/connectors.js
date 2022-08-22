import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { SequenceConnector } from "@0xsequence/web3-react-v6"
import { TorusConnector } from '@web3-react/torus-connector'
import {MetaMask}from "@web3-react/metamask"

import { Coin98Connector } from "@yay-games/coin98-web3-connector"

const injected = new InjectedConnector({
  supportedChainIds: [80001]
});

const walletconnect = new WalletConnectConnector({
  url: `https://rpc-mumbai.maticvigil.com/`,
  qrcode: true
});

const sequenceConnector = new SequenceConnector({
    chainId: 80001,
    url: `https://rpc-mumbai.maticvigil.com/`,
    appName: "sequenceConnector"
});

const walletlink = new WalletLinkConnector({
  url: `https://rpc-mumbai.maticvigil.com/`,
  appName: "web3-react-demo"
});

const torusConnector = new TorusConnector ({
  rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true

})

const coin98Connector = new Coin98Connector ({
  rpcUrl: `https://rpc-mumbai.maticvigil.com/`,
  qrcode: true

})

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink,
  sequenceWallet: sequenceConnector,
  torusWallet: torusConnector,
  coin98Wallet: coin98Connector
};
