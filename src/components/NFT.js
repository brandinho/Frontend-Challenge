import React from "react";
import "./NFT.css";

const NFT = ({ nfts }) => {
  return (
    <div className="grid">
      {nfts.map((nft, i) => (
        <div key={i} className="nft-card">
          <p>NFT #: {i}</p>
          <p className="nft-attributes">DNA: {nft.dna}</p>
          <p>Speed: {nft.speed}</p>
          <p>Price: {nft.price}</p>
          <p>Power: {nft.power}</p>
        </div>
      ))}
    </div>
  );
};

export default NFT;
