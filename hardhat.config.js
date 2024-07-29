require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();

const PRIVATE_KEY = "47f83fd895dd3d09385eabfc234827df2e1572fa56e2dcc8decc8ba1fa332be1";

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200  // Adjust the number of runs based on your requirements
      }
    }
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x" + PRIVATE_KEY]  // Replace PRIVATE_KEY with a private key from Ganache
    }
  }
};
