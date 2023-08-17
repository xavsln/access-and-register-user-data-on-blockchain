import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

import modifyArrayVariableContract from "./ethereum/modifyArrayVariable.js";
import { HARDHAT_NETWORK_SUPPORTED_HARDFORKS } from "hardhat/internal/constants";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState("");

  const [getRegisteredUsersError, setGetRegisteredUsersError] = useState("");
  const [getRegisteredUsersSuccess, setGetRegisteredUsersSuccess] =
    useState("");
  const [transactionData, setTransactionData] = useState("");

  /* Create an instance of the contract */
  const [svContract, setSvContract] = useState("");

  /* Create a state variable that stores the contractVariable */
  const [contractStringVariable, setStringContractVariable] = useState([]);
  // const [newContractStringVariable, setNewContractStringVariable] =
  //   useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserLocation, setNewUserLocation] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  // ***************************************************************
  // Functions related to wallet connections
  // ***************************************************************
  const connectWallet = async () => {
    alert("This should open your wallet");
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);

        /* get signer */
        setSigner(provider.getSigner());

        /* local contract instance */
        setSvContract(modifyStringVariableContract(provider));

        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          /* get signer */
          setSigner(provider.getSigner());

          /* local contract instance */
          setSvContract(modifyArrayVariableContract(provider));

          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // ***************************************************************
  // Function called when user clicks on "GET REGISTERD USERS"
  // ***************************************************************
  const getRegisteredUsersHandler = async () => {
    alert(
      "You should see the list of registered users in the form of a table below"
    );

    setGetRegisteredUsersError("");
    setGetRegisteredUsersSuccess("");

    try {
      // call the myVariable() getter function in the Smart Contract
      const resp = await svContract.getAllRegisteredUsersData();

      console.log("Resp: ", resp);

      // console.log("Resp type: ", typeof resp);

      // console.log("Resp [0]: ", resp[0]);
      // console.log("Resp [0]: ", resp[0].userName, resp[0].userLocation);

      // console.log("Resp [1]: ", resp[1]);
      // console.log("Resp [1]: ", resp[1].userName, resp[1].userLocation);

      resp.map((user) => console.log(user.userName));

      setStringContractVariable(resp);

      console.log("contractStringVariable: ", contractStringVariable);

      contractStringVariable.map((user) => console.log(user));
      contractStringVariable.map((user) =>
        console.log(user.userName, user.userLocation)
      );

      setGetRegisteredUsersSuccess(
        "Operation succeeded - User list was returned"
      );
      setTransactionData(resp.hash);
    } catch (err) {
      console.error(err.message);
      setGetRegisteredUsersError(err.message);
    }
  };

  // ***************************************************************
  // Function called when user clicks on "REGISTER NEW USER"
  // ***************************************************************
  const registerNewUserHandler = async () => {
    alert(
      `This will register "${newUserName}" located in "${newUserLocation}"`
    );

    try {
      const svContractWithSigner = svContract.connect(signer);

      // call the modifyMyVariable() function in the Smart Contract along with the newContractStringVariable value
      const resp = await svContractWithSigner.registerNewUser(
        newUserName,
        45, // age input is not implemented on the form therefore it is set to a default value as the Smart Contract expects a value
        newUserLocation
      );

      console.log(resp);
      setGetRegisteredUsersSuccess(
        "Operation succeeded - New user was registered"
      );
      setTransactionData(resp.hash);
    } catch (err) {
      console.error(err.message);
      setGetRegisteredUsersError(err.message);
    }
  };

  return (
    <div>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <h1 className='navbar-item is-size-4'>
              Register New Users on the Blockchain
            </h1>
          </div>
          <div id='navbarMenu' className='navbar-menu'>
            <div className='navbar-end is-align-items-center py-3'>
              <button
                className='button is-white connect-wallet'
                onClick={connectWallet}
              >
                <span className='is-link has-text-weight-bold'>
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className='hero is-fullheight'>
        <div className='register-hero-body'>
          <div className='container has-text-centered main-content'>
            <h1 className='title is-1'>A simple dApp that allows:</h1>
            <div className='mx-5'>
              <h5>
                <ol>
                  <li>
                    To get access to a list of registered users stored on a
                    Smart Contract on Goerli Ethereum testnet
                    (0xaF8943C1Dc55a5Dc675510Aa187435E55e74A355)
                  </li>
                  <li>To register a new user.</li>
                </ol>
              </h5>
            </div>

            <br></br>
            <a
              href='https://goerli.etherscan.io/address/0xaF8943C1Dc55a5Dc675510Aa187435E55e74A355'
              target='_blank'
            >
              Check deployed Smart Contract on Goerli (address:
              0xaF8943C1Dc55a5Dc675510Aa187435E55e74A355)
            </a>

            {/* Display the result of the transaction, success or error */}
            <div className='mt-5'>
              {getRegisteredUsersError && (
                <div className='withdraw-error'> {getRegisteredUsersError}</div>
              )}
              {getRegisteredUsersSuccess && (
                <div className='withdraw-success'>
                  {" "}
                  {getRegisteredUsersSuccess}
                </div>
              )}
              {"   "}
            </div>
            <div className='box address-box'>
              <div className='columns'>
                <div className='column is-three-fifths'>
                  <input
                    className='input is-medium'
                    type='text'
                    placeholder='Enter your wallet address (0x...)'
                    defaultValue={walletAddress}
                  />
                </div>
                <div className='column'>
                  <button
                    className='button is-link is-medium is-fullwidth'
                    onClick={getRegisteredUsersHandler}
                    disabled={walletAddress ? false : true}
                  >
                    GET REGISTERED USERS
                  </button>
                </div>
              </div>

              <div className='columns'>
                <div className='column is-three-fifths'>
                  {/* User to input user name */}
                  <input
                    id='username'
                    className='input is-medium mb-1'
                    type='text'
                    placeholder='Enter the name of the user'
                    onChange={(e) => setNewUserName(e.target.value)}
                    value={newUserName}
                  />
                  {/* User to input location */}
                  <input
                    id='location'
                    className='input is-medium'
                    type='text'
                    placeholder='Enter the location of the user'
                    onChange={(e) => setNewUserLocation(e.target.value)}
                    value={newUserLocation}
                  />
                </div>
                <div className='column'>
                  <button
                    className='button is-link is-medium is-fullwidth'
                    onClick={registerNewUserHandler}
                    disabled={walletAddress ? false : true}
                  >
                    REGISTER A NEW USER
                  </button>
                </div>
              </div>

              <article className='panel is-grey-darker'>
                <p className='panel-heading'>Transaction Data</p>
                <div className='panel-block'>
                  {/* <p>transaction data</p> */}
                  <p>
                    {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>

              {/* Table output */}

              <article className='panel is-grey-darker'>
                <p className='panel-heading'>
                  Table output of data from Smart Contract
                </p>
                <div className='panel-block'>
                  <table className='table is-fullwidth is-striped'>
                    <thead>
                      <tr>
                        <th>
                          <abbr>Position</abbr>
                        </th>
                        <th>
                          <abbr>Name</abbr>
                        </th>
                        <th>
                          <abbr>Location</abbr>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* Loop through the users array */}
                      {contractStringVariable.map((user, index) => (
                        <tr key={index + 1}>
                          <td className='has-text-left'>{index + 1}</td>
                          <td className='has-text-left'>{user.userName}</td>
                          <td className='has-text-left'>{user.userLocation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* <p>
                    {contractStringVariable
                      ? `String Variable on Smart Contract: ${contractStringVariable}`
                      : "--"}
                  </p> */}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
