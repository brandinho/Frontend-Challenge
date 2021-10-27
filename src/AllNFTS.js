import React from "react";
import { useAllNfts } from "./hooks/hooks";
import { Link } from "react-router-dom";
import NFT from "../src/components/NFT";
import "./styles/AllNFTS.css";

const AllNFTS = () => {
  const { nftArray } = useAllNfts();
  return (
    <div className="container">
      <Link id="Marketplace" to="/">
        <h1>MarketPlace</h1>
      </Link>
      <small>These are all of the NFT's</small>

      <Link id="link" to="/">
        See your NFTS
      </Link>

      <NFT nfts={nftArray} />
    </div>
  );
};

export default AllNFTS;
