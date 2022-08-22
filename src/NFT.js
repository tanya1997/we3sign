import React, { useEffect } from 'react';
import { NftProvider, useNft } from "use-nft"

import { useWeb3React } from "@web3-react/core";

function TestHome() {
      const { loading, error, nft } = useNft(
        "0x3794fb8254f9e0e6b3bb36a8b5173c963bceba27",
        "11461"
      )
    
      // nft.loading is true during load.
      if (loading) return "Loading…"
    
      // nft.error is an Error instance in case of error.
      if (error) return "Error."

      return (
    
        <section>
            <h1>{nft.name}</h1>
            <img src={nft.image} alt="" />
            <p>{nft.description}</p>
        </section>
      )

}
function NFT() {

    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active,
      } = useWeb3React();

      const ethersConfig = {
        provider: library.provider,
      }
    
      // You can now display the NFT metadata.
      return (
        <div >
            {
                active ? (
                <NftProvider fetcher={["ethers", ethersConfig]}>
                    <TestHome/>
                </NftProvider>) : (
                <div>loading</div>)
            }
        </div>
      )
}

export default NFT;