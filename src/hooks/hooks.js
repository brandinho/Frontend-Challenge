import NFTFarm from "../utils/NFTFarm.json";
import Web3 from "web3";
import { useState, useEffect, useCallback, useContext } from "react";
import { WalletContext } from "../context/context";

export const web3 = new Web3(Web3.givenProvider || "https://localhost:8545");
const contractAddress = "0xDb172Cf85521EBA2d825C4DD5824ef878696Ee05";

export const getContract = () =>
  new web3.eth.Contract(NFTFarm.abi, contractAddress);

export function useAllNfts() {
  const [nftArray, setNFTArray] = useState([]);
  const NFTQuantity = useNFTQuantity();
  const { account, minting, setMinting } = useWallet();

  const mintNFT = useCallback(async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        setMinting(true);

        let wei = web3.utils.toWei(".05", "ether");
        getContract()
          .methods.createRandomFighter(Math.floor(Math.random() * 100))
          .send({ from: account, value: wei })
          .then(async function (res) {
            let response = await res;
            console.log(response);
            // setMinting(false);

            setNFTArray((prev) => [
              ...prev,
              response.events.NFTCreated.returnValues,
            ]);
            alert("NFT MINTED!");
            setMinting(false);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [account, setMinting]);

  useEffect(() => {
    const getAllNFTS = async () => {
      try {
        const nfts = await Promise.all(
          Array(NFTQuantity)
            .fill(0)
            .map((_, index) =>
              getContract()
                .methods.tokens(index)
                .call()
                .then(async function (res) {
                  // console.log({ res });
                  return res;
                })
                .catch(function (err) {
                  console.log(err);
                })
            )
        );

        console.log({ NFTQuantity });

        setNFTArray(nfts);
      } catch (error) {
        console.log(error);
      }
    };

    if (account && NFTQuantity > 0) {
      getAllNFTS();
    }
  }, [account, NFTQuantity]);

  return { nftArray, mintNFT, minting };
}

export function useMyNFTS() {
  const [myNFTS, setMyNFTS] = useState([]);
  const { nftArray, mintNFT } = useAllNfts();
  const { account } = useWallet();

  useEffect(() => {
    const getMyNfts = () => {
      try {
        nftArray.forEach((nft, index) => {
          getContract()
            .methods.ownerOf(index)
            .call()
            .then(function (data) {
              if (data === account) {
                setMyNFTS((prev) => {
                  if (prev.some((item) => item.dna === nft.dna)) {
                    return prev;
                  }
                  return [...prev, nft];
                });
              } else {
                return false;
              }
            });
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (account && nftArray.length > 0) {
      getMyNfts();
    }
  }, [account, nftArray]);

  return { myNFTS, mintNFT };
}

export function useNFTQuantity() {
  const [NFTQuantity, setNFTQuantity] = useState(0);
  const { account } = useWallet();

  useEffect(() => {
    async function fetchNFTQuantity() {
      getContract()
        .methods.getNumberOfNFTs()
        .call()
        .then(function (res) {
          setNFTQuantity(Number(res));
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    if (account) {
      fetchNFTQuantity();
    }
  }, [account]);

  return NFTQuantity;
}

export function useWallet() {
  return useContext(WalletContext);
}
