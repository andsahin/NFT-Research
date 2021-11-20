const PRIVATE_KEY = '5f6a8b38c732f0655b789d91652a8c40f4e2c30af008758d56054c90e8679371';
const mywallet = '0x9500862961695C739f70152950673793f3312c61';
const API_URL = 'https://eth-ropsten.alchemyapi.io/v2/MJFQu6Bkq67IOl2KCRbcOfLHmtQR0vLw';
const recever = '0x0E5CDdF79CF05897F95C0b650b25fcDCFc38f2De';

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
//console.log(web3);

const contract = require("../artifacts/contracts/token/ERC721/ERC721.sol/ERC721.json");
//console.log(contract.abi);
const contractAddress = "0x0D57cC016543395D00a76d55B9c2cAF0CdD5dF0f"



async function mintNFT() {

  const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
  const nonce = await web3.eth.getTransactionCount(mywallet, "latest") //get latest nonce
// console.log(nftContract.methods);

// return true;

  //the transaction
  const tx = {
    from: mywallet,
    to: recever, 
    nonce: nonce,
    gas: 500000,
    data: await nftContract.methods.transferFrom(mywallet, recever, 2).encodeABI(),
    chainId: 3
  }
console.log(nftContract);
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          console.log(signedTx);
          if (!err) {
            console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
          } else {
            console.log("Something went wrong when submitting your transaction:",err)
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT()
