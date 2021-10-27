import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllNFTS from "./AllNFTS";
import Collection from "./Collection";
import { web3 } from "./hooks/hooks";
import { WalletContext } from "./context/context";
import "./styles/App.css";
function useWallet() {
  const [account, setAccount] = useState("");
  const [minting, setMinting] = useState(false);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      await window.ethereum.send("eth_requestAccounts");

      const [acct] = await web3.eth.getAccounts();

      setAccount(acct);
    }
  }, []);

  useEffect(() => {
    async function fetchWallet() {
      const accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }

      console.log(accounts[0]);
    }

    fetchWallet();
  }, []);

  return { account, connectWallet, minting, setMinting };
}

const App = () => {
  const wallet = useWallet();
  return (
    <div className="App">
      <WalletContext.Provider value={wallet}>
        <Router>
          <Switch>
            <Route exact path="/all-nfts" component={AllNFTS} />
            <Route exact path="/" component={Collection} />
          </Switch>
        </Router>
      </WalletContext.Provider>
    </div>
  );
};

export default App;
