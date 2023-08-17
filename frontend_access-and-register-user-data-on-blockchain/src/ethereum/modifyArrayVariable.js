// ***********************************************************************
// Create an instance of our Contract so we can interact with this object
// ***********************************************************************

import { ethers } from "ethers";

const modifyArrayVariableAbi = [
  {
    inputs: [],
    name: "getAllRegisteredUsersData",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "userId", type: "uint256" },
          { internalType: "string", name: "userName", type: "string" },
          { internalType: "uint256", name: "userAge", type: "uint256" },
          { internalType: "string", name: "userLocation", type: "string" },
        ],
        internalType: "struct ModifyArrayVariable.UserData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_age", type: "uint256" },
      { internalType: "string", name: "_location", type: "string" },
    ],
    name: "registerNewUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// A function that will return an instance of the Smart Contract
const modifyArrayVariableContract = (provider) => {
  return new ethers.Contract(
    "0xaF8943C1Dc55a5Dc675510Aa187435E55e74A355",
    modifyArrayVariableAbi,
    provider
  );
};

export default modifyArrayVariableContract;
