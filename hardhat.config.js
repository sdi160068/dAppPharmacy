require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();
 
PRIVATE_KEY = "47f83fd895dd3d09385eabfc234827df2e1572fa56e2dcc8decc8ba1fa332be1"

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x" + PRIVATE_KEY]  // Replace PRIVATE_KEY with a private key from Ganache
    }
  }
};