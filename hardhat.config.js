/**
* @type import('hardhat/config').HardhatUserConfig
*/
const test = require("@nomiclabs/hardhat-ethers");

const privateKey = '5f6a8b38c732f0655b789d91652a8c40f4e2c30af008758d56054c90e8679371';
const api = 'https://eth-ropsten.alchemyapi.io/v2/MJFQu6Bkq67IOl2KCRbcOfLHmtQR0vLw';

module.exports = {
   solidity: "0.8.2",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url:api,
         accounts: [`0x${privateKey}`]
      }
   },
}

 