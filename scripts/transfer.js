

    const API_URL = "https://eth-ropsten.alchemyapi.io/v2/MJFQu6Bkq67IOl2KCRbcOfLHmtQR0vLw";
    const PRIVATE_KEY = "5f6a8b38c732f0655b789d91652a8c40f4e2c30af008758d56054c90e8679371";
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);

    const contractAddress = '0x0D57cC016543395D00a76d55B9c2cAF0CdD5dF0f';
    const contract = require("../artifacts/contracts/token/ERC721/ERC721.sol/ERC721.json");

    const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

    const myAddress = '0x3780e528bd5bdf7bfbe2fd4da91504df6507bf61'; //TODO: replace this address with your own public address
    const to = '0x0E5CDdF79CF05897F95C0b650b25fcDCFc38f2De';

    async function transferNFT() {
        const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); //get latest nonce
    
      //the transaction
        const tx = {
          'category': 'erc721',
          'from': myAddress,
          'to': to,
          'nonce': nonce,
          'gas': 500000,
          'data': nftContract.methods.transferFrom(myAddress,to, 1).encodeABI()
        }
    
        const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
        signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck Alchemy's Mempool to view the status of your transaction!"
                )
                } else {
                console.log(
                    "Something went wrong when submitting your transaction:",
                    err
                )
                }
            }
            )
        })
        .catch((err) => {
            console.log(" Promise failed:", err)
        })
    
    }
    transferNFT()