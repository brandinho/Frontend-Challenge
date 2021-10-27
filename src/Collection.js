import "./styles/Collection.css";
import React from "react";
import { Link } from "react-router-dom";
import { useMyNFTS, useWallet, useAllNfts } from "./hooks/hooks";
import NFT from "../src/components/NFT";

function Collection() {
  const { minting } = useAllNfts();
  const { myNFTS, mintNFT } = useMyNFTS();
  const { account, connectWallet } = useWallet();
  const buttonAddressFormat =
    account.toString().slice(0, 6) + "..." + account.toString().slice(-4);
  return (
    <div>
      <header className="App-header">
        <h1>My NFT Collection Page</h1>
        <small>These are my NFT's</small>
        {account !== "" ? (
          <p>Wallet Connected: {buttonAddressFormat}</p>
        ) : (
          <button onClick={connectWallet}>connect wallet</button>
        )}

        <button onClick={mintNFT} className="mint-btn">
          {minting ? "Minting please wait..." : "Mint NFT"}
        </button>
        <Link id="link" to="/all-nfts">
          See All NFTS
        </Link>

        <NFT nfts={myNFTS} />
      </header>
    </div>
  );
}

export default Collection;
